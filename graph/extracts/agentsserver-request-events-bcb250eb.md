# AgentsServer 请求与事件片段

可重建阅读缓存；来源 raw/agentsserver-agent-server-py-2026-10-04-ac01b8da041c.py，commit bcb250eb5fab8678d41dc23489427f013305b57d。仅下列片段，不是全文复核。

## 原文件 13455–13586 行

```python
13455:             self._reservations.setdefault(sid, set()).add(ws)
13456:             return True
13457: 
13458:     async def subscribe(self, sid: str, ws: WebSocket) -> bool:
13459:         await ws.accept()
13460:         activated = False
13461:         try:
13462:             if not await self.reserve(sid, ws):
13463:                 await close_event_websocket_over_capacity(ws)
13464:                 return False
13465:             activated = await self.register_accepted(sid, ws)
13466:             if not activated:
13467:                 await close_event_websocket_over_capacity(ws)
13468:             return activated
13469:         finally:
13470:             if not activated:
13471:                 await self.unsubscribe(sid, ws)
13472: 
13473:     async def unsubscribe(self, sid: str, ws: WebSocket) -> None:
13474:         async with self._lock:
13475:             self._reasoning_subscribers.discard(ws)
13476:             self._reasoning_text_subscribers.discard(ws)
13477:             subs = self._subscribers.get(sid)
13478:             if subs:
13479:                 subs.discard(ws)
13480:                 if not subs:
13481:                     self._subscribers.pop(sid, None)
13482:             reservations = self._reservations.get(sid)
13483:             if reservations:
13484:                 reservations.discard(ws)
13485:                 if not reservations:
13486:                     self._reservations.pop(sid, None)
13487: 
13488:     async def register_accepted(
13489:         self, sid: str, ws: WebSocket, *, reasoning_stream: bool = False, reasoning_text: bool = False,
13490:     ) -> bool:
13491:         """Activate a reserved socket after it has completed catch-up."""
13492: 
13493:         async with self._lock:
13494:             if ws in self._subscribers.get(sid, set()):
13495:                 return True
13496:             reserved = self._reservations.get(sid)
13497:             if not reserved or ws not in reserved:
13498:                 # Keep direct callers safe: admission is still atomic if they
13499:                 # did not explicitly reserve before their catch-up work.
13500:                 session_count = len(self._subscribers.get(sid, set())) + len(
13501:                     self._reservations.get(sid, set())
13502:                 )
13503:                 if (
13504:                     self._connection_count_locked() >= EVENT_WEBSOCKET_MAX_ACTIVE_GLOBAL
13505:                     or session_count >= EVENT_WEBSOCKET_MAX_ACTIVE_PER_SESSION
13506:                 ):
13507:                     return False
13508:             else:
13509:                 reserved.discard(ws)
13510:                 if not reserved:
13511:                     self._reservations.pop(sid, None)
13512:             self._subscribers.setdefault(sid, set()).add(ws)
13513:             if reasoning_stream:
13514:                 self._reasoning_subscribers.add(ws)
13515:                 if reasoning_text:
13516:                     self._reasoning_text_subscribers.add(ws)
13517:             return True
13518: 
13519:     async def broadcast(self, sid: str, event: dict[str, Any]) -> None:
13520:         # Open shared-chat pages get only a non-blocking, chat-scoped wakeup.
13521:         # Their private text projection runs separately, never in this path.
13522:         transient = event.get("type") == "reasoning_summary_stream"
13523:         live_shares = globals().get("INTERACTIVE_CHAT_LIVE")
13524:         if not transient and live_shares is not None:
13525:             live_shares.notify(sid, event)
13526:         async with self._lock:
13527:             subs = [ws for ws in self._subscribers.get(sid, set())
13528:                     if not transient or ws in self._reasoning_subscribers]
13529: 
13530:         async def send(ws: WebSocket) -> WebSocket | None:
13531:             try:
13532:                 packet = event
13533:                 if transient and ws not in self._reasoning_text_subscribers:
13534:                     packet = {**event, "items": [item for item in event.get("items", [])
13535:                         if item.get("phase") != "reasoning"]}
13536:                 await asyncio.wait_for(
13537:                     ws.send_json(packet),
13538:                     timeout=WEBSOCKET_SEND_TIMEOUT_SECONDS,
13539:                 )
13540:                 return None
13541:             except Exception:
13542:                 return ws
13543: 
13544:         async def deliver_and_evict() -> None:
13545:             stale = [
13546:                 ws
13547:                 for ws in await asyncio.gather(*(send(ws) for ws in subs))
13548:                 if ws is not None
13549:             ]
13550:             if not stale:
13551:                 return
13552: 
13553:             # A failed send does not necessarily wake the endpoint blocked in
13554:             # receive_text(). Close the transport before releasing its capacity
13555:             # lease so a slow client cannot repeatedly time out, reconnect, and
13556:             # accumulate unaccounted sockets/tasks. If close itself fails, keep
13557:             # the socket counted until the endpoint's finally block unsubscribes.
13558:             closed = await asyncio.gather(
13559:                 *(close_event_websocket_after_delivery_failure(ws) for ws in stale)
13560:             )
13561:             releasable = [
13562:                 ws for ws, close_succeeded in zip(stale, closed)
13563:                 if close_succeeded
13564:             ]
13565:             if not releasable:
13566:                 return
13567:             async with self._lock:
13568:                 current = self._subscribers.get(sid, set())
13569:                 for ws in releasable:
13570:                     current.discard(ws)
13571:                     self._reasoning_subscribers.discard(ws)
13572:                     self._reasoning_text_subscribers.discard(ws)
13573:                 if not current:
13574:                     self._subscribers.pop(sid, None)
13575: 
13576:         # Broadcast is part of the durable event projection path. Once a send
13577:         # has failed, caller cancellation must not interrupt the close/accounting
13578:         # transaction and recreate the resource leak this eviction fixes.
13579:         delivery_task = asyncio.create_task(deliver_and_evict())
13580:         try:
13581:             await asyncio.shield(delivery_task)
13582:         except asyncio.CancelledError:
13583:             await join_task_despite_caller_cancellation(delivery_task)
13584:             raise
13585: 
13586: 
```

## 原文件 16701–16783 行

```python
16701: async def append_event(
16702:     session_id: str,
16703:     event_type: str,
16704:     payload: dict[str, Any] | None = None,
16705: ) -> dict[str, Any]:
16706:     def discarded_event() -> dict[str, Any]:
16707:         return {
16708:             "seq": 0,
16709:             "id": f"discarded_{uuid.uuid4().hex[:16]}",
16710:             "session_id": session_id,
16711:             "type": event_type,
16712:             "ts": now_iso(),
16713:             "discarded": True,
16714:             **dict(payload or {}),
16715:         }
16716: 
16717:     if (
16718:         session_id in DELETING_SESSIONS
16719:         or session_id in DELETED_SESSION_TOMBSTONES
16720:     ):
16721:         return discarded_event()
16722:     async with event_delivery_lock(session_id):
16723:         if (
16724:             session_id in DELETING_SESSIONS
16725:             or session_id in DELETED_SESSION_TOMBSTONES
16726:         ):
16727:             return discarded_event()
16728:         ensure_dirs(session_id)
16729:         path = events_path(session_id)
16730:         seq = await next_event_seq(session_id, path)
16731:         ts = now_iso()
16732:         stored_payload = inherit_internal_status_run_metadata(payload)
16733:         output = stored_payload.get("output")
16734:         if event_type == "tool_finished" and output is not None:
16735:             output_text = event_output_text(output)
16736:             if len(output_text) > CODEX_APP_SERVER_TOOL_OUTPUT_MAX_CHARS:
16737:                 stored_payload["output"] = bounded_codex_output_text(output_text)
16738:                 stored_payload["output_chars"] = len(output_text)
16739:                 stored_payload["output_truncated"] = True
16740:         event = {
16741:             "seq": seq,
16742:             "id": f"evt_{uuid.uuid4().hex[:16]}",
16743:             "session_id": session_id,
16744:             "type": event_type,
16745:             "ts": ts,
16746:             **stored_payload,
16747:         }
16748:         try:
16749:             with path.open("ab") as f:
16750:                 line_offset = f.tell()
16751:                 f.write((json.dumps(event, separators=(",", ":")) + "\n").encode("utf-8"))
16752:         except BaseException:
16753:             # A short/failed write may have left a non-newline fragment. Force
16754:             # the next append through the repair path while keeping the
16755:             # already-consumed sequence as a high-water mark.
16756:             await reconcile_event_seq_after_failed_write(
16757:                 session_id,
16758:                 path,
16759:                 consumed_high_water=seq,
16760:             )
16761:             raise
16762:         if seq % EVENT_INDEX_STRIDE == 0:
16763:             # Sparse catch-up checkpoint; a failure only costs a full scan.
16764:             with suppress(Exception):
16765:                 await asyncio.to_thread(
16766:                     record_event_index_entry, path, seq, line_offset
16767:                 )
16768:         HISTORY_SEARCH_DIRTY.add(session_id)
16769:         await update_session_event_metadata(session_id, event)
16770:         if event_files_belong_to_session(event, session_id) and is_client_visible_event(event):
16771:             safe_event = client_safe_event(event)
16772:             await HUB.broadcast(session_id, safe_event)
16773:     # Terminal cross-chat cleanup may append lifecycle rows to this same chat;
16774:     # run it only after releasing the per-chat event delivery lock.
16775:     if event_type == "turn_stopped":
16776:         try:
16777:             await finalize_cross_chat_terminal(event)
16778:         except Exception as exc:
16779:             logger.exception(
16780:                 "cross-chat stop finalization recovered session=%s run=%s error=%s",
16781:                 session_id,
16782:                 event.get("run_id"),
16783:                 concise_error_message(exc),
```

## 原文件 70916–71112 行

```python
70916: async def run_codex(
70917:     session_id: str,
70918:     run_id: str,
70919:     prompt: str,
70920:     sess: dict[str, Any],
70921:     manifest_path: Path,
70922:     *,
70923:     interactive_app_server: bool = False,
70924:     standalone_provider_context: bool = False,
70925:     provider_command: ProviderCommandRecord | None = None,
70926:     provider_runtime_env: dict[str, str] | None = None,
70927: ) -> None:
70928:     runtime_env = validate_provider_runtime_env(provider_runtime_env)
70929:     if CODEX_TRANSPORT == CODEX_TRANSPORT_EXEC:
70930:         if provider_command is not None:
70931:             raise RuntimeError(
70932:                 "Codex provider skills require the app-server transport"
70933:             )
70934:         if not standalone_provider_context:
70935:             await mark_codex_exec_context_usage_unavailable(session_id)
70936:         await run_codex_exec(
70937:             session_id,
70938:             run_id,
70939:             prompt,
70940:             sess,
70941:             manifest_path,
70942:             provider_runtime_env=runtime_env,
70943:             **(
70944:                 {"standalone_provider_context": True}
70945:                 if standalone_provider_context
70946:                 else {}
70947:             ),
70948:         )
70949:         return
70950:     await run_codex_app_server(
70951:         session_id,
70952:         run_id,
70953:         prompt,
70954:         sess,
70955:         manifest_path,
70956:         # Interactive approvals/questions cannot be represented by the exec
70957:         # fallback. Never silently change security semantics after opt-in.
70958:         allow_exec_fallback=(
70959:             CODEX_TRANSPORT == CODEX_TRANSPORT_AUTO
70960:             and not interactive_app_server
70961:             and provider_command is None
70962:         ),
70963:         interactive_app_server=interactive_app_server,
70964:         provider_runtime_env=runtime_env,
70965:         **(
70966:             {"provider_command": provider_command}
70967:             if provider_command is not None
70968:             else {}
70969:         ),
70970:         **(
70971:             {"standalone_provider_context": True}
70972:             if standalone_provider_context
70973:             else {}
70974:         ),
70975:     )
70976: 
70977: 
70978: async def start_turn(
70979:     session_id: str,
70980:     req: TurnRequest,
70981:     *,
70982:     queue_if_busy: bool = True,
70983:     queued_id: str | None = None,
70984:     display_file_ids: list[str] | None = None,
70985:     steering_lineage: list[dict[str, Any]] | None = None,
70986:     provider_context_mode: Literal["chat", "standalone"] = "chat",
70987:     accepted_obligation_ids: list[str] | None = None,
70988:     accepted_exchange_ids: list[str] | None = None,
70989:     scheduled_job_chat_references: bool = False,
70990:     scheduled_job_revision: str | None = None,
70991:     scheduled_job_manual_run: bool = False,
70992: ) -> dict[str, Any]:
70993:     await wait_for_queue_recovery_admission()
70994:     if queue_if_busy and provider_context_mode == "chat":
70995:         await reconcile_idle_queue_session(
70996:             session_id,
70997:             schedule=True,
70998:             reason="turn_admission",
70999:         )
71000:     # Capture the chat backend before this request can wait on lifecycle work.
71001:     # If a concurrent backend PATCH wins the lock, the request must be retried
71002:     # instead of applying a now-stale per-turn backend after the PATCH.
71003:     admission_backend: str | None = None
71004:     if provider_context_mode == "chat":
71005:         admission_session = STORE.sessions.get(session_id)
71006:         if admission_session is not None:
71007:             admission_backend = str(
71008:                 admission_session.get("backend") or DEFAULT_BACKEND
71009:             ).strip().lower()
71010:     # Register the request task before BUSY_SESSIONS is reserved. Stop can then
71011:     # distinguish a legitimate slow launch from an orphaned reservation and
71012:     # leave a deferred stop marker for the runner to reconcile when it binds.
71013:     request_task = asyncio.current_task()
71014:     if request_task is not None:
71015:         register_session_task(SESSION_TURN_TASKS, session_id, request_task)
71016:     try:
71017:         async with session_lifecycle_lock(session_id):
71018:             ensure_session_not_deleting(session_id)
71019:             return await _start_turn_locked(
71020:                 session_id,
71021:                 req,
71022:                 queue_if_busy=queue_if_busy,
71023:                 queued_id=queued_id,
71024:                 display_file_ids=display_file_ids,
71025:                 steering_lineage=steering_lineage,
71026:                 provider_context_mode=provider_context_mode,
71027:                 admission_backend=admission_backend,
71028:                 accepted_obligation_ids=accepted_obligation_ids,
71029:                 accepted_exchange_ids=accepted_exchange_ids,
71030:                 scheduled_job_chat_references=scheduled_job_chat_references,
71031:                 scheduled_job_revision=scheduled_job_revision,
71032:                 scheduled_job_manual_run=scheduled_job_manual_run,
71033:             )
71034:     finally:
71035:         if request_task is not None:
71036:             tasks = SESSION_TURN_TASKS.get(session_id)
71037:             if tasks is not None:
71038:                 tasks.discard(request_task)
71039:                 if not tasks:
71040:                     SESSION_TURN_TASKS.pop(session_id, None)
71041: 
71042: 
71043: async def _start_turn_locked(
71044:     session_id: str,
71045:     req: TurnRequest,
71046:     *,
71047:     queue_if_busy: bool = True,
71048:     queued_id: str | None = None,
71049:     display_file_ids: list[str] | None = None,
71050:     steering_lineage: list[dict[str, Any]] | None = None,
71051:     provider_context_mode: Literal["chat", "standalone"] = "chat",
71052:     admission_backend: str | None = None,
71053:     accepted_obligation_ids: list[str] | None = None,
71054:     accepted_exchange_ids: list[str] | None = None,
71055:     accepted_provider_route_snapshot: list[dict[str, Any]] | None = None,
71056:     accepted_team_mail_route_snapshot: list[dict[str, Any]] | None = None,
71057:     accepted_secure_peer_route_snapshots: list[dict[str, Any]] | None = None,
71058:     scheduled_job_chat_references: bool = False,
71059:     scheduled_job_revision: str | None = None,
71060:     scheduled_job_manual_run: bool = False,
71061:     mailbox_wake_claim: dict[str, Any] | None = None,
71062: ) -> dict[str, Any]:
71063:     # Internal delivery paths can enter with the lifecycle lock already held
71064:     # and intentionally bypass ``start_turn``. They still must not start or
71065:     # queue ahead of an undiscovered durable startup row.
71066:     await wait_for_queue_recovery_admission()
71067:     if (
71068:         req.purpose == SECURE_PEER_DELIVERY_PURPOSE
71069:         and not SECURE_PEER_AGENT_RELAY_ENABLED
71070:     ):
71071:         if req.secure_peer_envelope_id:
71072:             with suppress(Exception):
71073:                 await asyncio.to_thread(
71074:                     SECURE_PEER_RUNTIME.finish_delivery,
71075:                     str(req.secure_peer_envelope_id),
71076:                     succeeded=False,
71077:                     error="cross-server agent delivery was retired",
71078:                 )
71079:         raise HTTPException(
71080:             status_code=410,
71081:             detail=SECURE_PEER_AGENT_RELAY_UNAVAILABLE,
71082:         )
71083:     sess = STORE.sessions.get(session_id)
71084:     if not sess:
71085:         raise HTTPException(status_code=404, detail="session not found")
71086:     if sess.get("archived"):
71087:         raise HTTPException(status_code=409, detail="archived chats cannot start turns")
71088:     if req.purpose == "handoff_digest_delivery":
71089:         # Digest preparation happens outside the target lifecycle lock. Rebind
71090:         # its delivery authority to the current target at this boundary.
71091:         validate_handoff_digest_delivery_admission(
71092:             session_id,
71093:             req,
71094:             sess,
71095:             provider_context_mode=provider_context_mode,
71096:         )
71097:     if req.purpose == "chat_mailbox_wake" or mailbox_wake_claim is not None:
71098:         if (req.purpose != "chat_mailbox_wake" or mailbox_wake_claim is None
71099:                 or mailbox_wake_claim.get("target_session_id") != session_id
71100:                 or req.prompt != CHAT_MAILBOX_WAKE_PROMPT or req.display_prompt != ""
71101:                 or queue_if_busy or queued_id is not None or provider_context_mode != "chat"
71102:                 or req.chat_references or req.team_references or req.file_ids):
71103:             raise HTTPException(status_code=400, detail="mailbox wake requires internal idle admission")
71104:     if not routed_references_match_visible_prompt(
71105:         req.prompt,
71106:         req.display_prompt,
71107:         req.chat_references,
71108:         req.team_references,
71109:     ):
71110:         raise HTTPException(
71111:             status_code=400,
71112:             detail="routed references require display_prompt to exactly match prompt",
```

## 原文件 71570–71695 行

```python
71570:                 detail="wait for Codex goals configuration to finish",
71571:             )
71572:         if session_id in SERVER_MAINTENANCE_SESSIONS:
71573:             raise TransientAdmissionWait(
71574:                 status_code=409,
71575:                 detail=(
71576:                     "wait for Claude Stop recovery to finish"
71577:                     if session_id in CLAUDE_STOP_FENCE_SESSIONS
71578:                     else "wait for provider session maintenance to finish"
71579:                 ),
71580:             )
71581:         conflicting_opencode_session = next(
71582:             (
71583:                 owner_session_id
71584:                 for owner_session_id, owner in CURRENT_TURNS.items()
71585:                 if owner_session_id != session_id
71586:                 and opencode_execution_key is not None
71587:                 and owner.get("opencode_provider_execution_key")
71588:                 == opencode_execution_key
71589:                 and owner_session_id in BUSY_SESSIONS
71590:             ),
71591:             None,
71592:         )
71593:         if conflicting_opencode_session is not None:
71594:             # OpenCode uses a shared SQLite history store. Two local wrappers
71595:             # writing the same provider session concurrently race inside that
71596:             # database and can fail with "database is locked". Reject a new
71597:             # HTTP turn; durable queued promotions treat this retryable class
71598:             # as a wait and remain at the front of their own queue.
71599:             raise TransientAdmissionWait(
71600:                 status_code=409,
71601:                 detail=(
71602:                     "another AgentsDock chat is already running this "
71603:                     "OpenCode provider session"
71604:                 ),
71605:             )
71606:         if (
71607:             session_id in BUSY_SESSIONS
71608:             or has_prior_queue
71609:             or stop_cleanup_in_progress(session_id)
71610:         ):
71611:             if queue_if_busy:
71612:                 should_queue = True
71613:             else:
71614:                 raise TransientAdmissionWait(
71615:                     status_code=409,
71616:                     detail="session already has a running turn",
71617:                 )
71618:         else:
71619:             BUSY_SESSIONS.add(session_id)
71620:             CURRENT_TURNS[session_id] = {
71621:                 "run_id": None,
71622:                 **async_route_conversation_fields(delivery_record or {}),
71623:                 **({key: value for key, value in async_message_target_fields(delivery_record).items() if key != "message_body"}
71624:                    if is_async_route_message(delivery_record or {}) else {}),
71625:                 # Private per-admission identity for restart confirmation. A
71626:                 # run id is assigned only after several awaited startup
71627:                 # checks, so the blocker revision needs its own token to
71628:                 # distinguish a replacement reservation in that interval.
71629:                 "_server_restart_admission_id": reservation_admission_id,
71630:                 "prompt": req.prompt,
71631:                 "display_prompt": req.display_prompt,
71632:                 "file_ids": list(req.file_ids),
71633:                 "backend": req.backend or sess.get("backend") or DEFAULT_BACKEND,
71634:                 "purpose": req.purpose,
71635:                 "provider_context_mode": provider_context_mode,
71636:                 "queued_id": queued_id,
71637:                 "steering_lineage": normalized_lineage,
71638:                 "client_capabilities": list(req.client_capabilities),
71639:                 "chat_references": chat_reference_dicts(req.chat_references),
71640:                 "team_references": team_reference_dicts(req.team_references),
71641:                 "skill_selection": (
71642:                     req.skill_selection.model_dump()
71643:                     if req.skill_selection is not None
71644:                     else None
71645:                 ),
71646:                 "provider_cross_chat_route_snapshot": [
71647:                     dict(route) for route in provider_route_snapshot
71648:                 ],
71649:                 "secure_peer_route_snapshots": [
71650:                     dict(snapshot) for snapshot in secure_route_snapshots
71651:                 ],
71652:                 "cross_chat_envelope_id": req.cross_chat_envelope_id,
71653:                 "cross_chat_exchange_id": req.cross_chat_exchange_id,
71654:                 "cross_chat_exchange_leg_id": req.cross_chat_exchange_leg_id,
71655:                 "exchange_id": req.cross_chat_exchange_id,
71656:                 "exchange_leg_id": req.cross_chat_exchange_leg_id,
71657:                 "cross_chat_exchange_status": req.cross_chat_exchange_status,
71658:                 "secure_peer_envelope_id": req.secure_peer_envelope_id,
71659:                 "interactive_app_server": interactive_app_server,
71660:                 "interactive_agent_sdk": interactive_agent_sdk,
71661:                 **(
71662:                     {
71663:                         "opencode_provider_execution_key": (
71664:                             opencode_execution_key
71665:                         )
71666:                     }
71667:                     if opencode_execution_key is not None
71668:                     else {}
71669:                 ),
71670:             }
71671:             reserved = True
71672:     if should_queue:
71673:         return await enqueue_turn(
71674:             session_id,
71675:             req,
71676:             sess,
71677:             provider_route_snapshot=provider_route_snapshot,
71678:             secure_peer_route_snapshots=secure_route_snapshots,
71679:             reciprocal_route_grant=reciprocal_route_grant,
71680:         )
71681: 
71682:     blocker = await turn_start_blocker(ignore_session_id=session_id)
71683:     if blocker:
71684:         if reserved:
71685:             await release_turn_slot(
71686:                 session_id,
71687:                 expected_admission_id=reservation_admission_id,
71688:             )
71689:             reserved = False
71690:         raise TransientAdmissionWait(status_code=503, detail=f"agent launch deferred: {blocker}")
71691: 
71692:     started_event: dict[str, Any] | None = None
71693:     started_payload: dict[str, Any] | None = None
71694:     provider_task_committed = False
71695:     delivery_admitted = False
```

## 原文件 72389–72469 行

```python
72389:         if backend == BACKEND_CODEX:
72390:             assert_provider_user_message_unchanged(
72391:                 provider_turn_payload.user_prompt,
72392:                 prompt,
72393:             )
72394:             task = run_codex(
72395:                 session_id,
72396:                 run_id,
72397:                 provider_turn_payload.user_prompt,
72398:                 dict(sess),
72399:                 manifest_path,
72400:                 interactive_app_server=interactive_app_server,
72401:                 provider_command=resolved_provider_command,
72402:                 provider_runtime_env=provider_turn_payload.runtime_env,
72403:                 **(
72404:                     {"standalone_provider_context": True}
72405:                     if provider_context_mode == "standalone"
72406:                     else {}
72407:                 ),
72408:             )
72409:         elif backend == BACKEND_CURSOR:
72410:             task = run_cursor(
72411:                 session_id,
72412:                 run_id,
72413:                 provider_prompt,
72414:                 dict(sess),
72415:                 manifest_path,
72416:                 **(
72417:                     {"standalone_provider_context": True}
72418:                     if provider_context_mode == "standalone"
72419:                     else {}
72420:                 ),
72421:             )
72422:         elif backend == BACKEND_OPENCODE:
72423:             task = run_opencode(
72424:                 session_id,
72425:                 run_id,
72426:                 (
72427:                     prompt
72428:                     if resolved_provider_command is not None
72429:                     else provider_prompt
72430:                 ),
72431:                 dict(sess),
72432:                 manifest_path,
72433:                 attachment_paths=opencode_turn_attachment_paths,
72434:                 provider_command=resolved_provider_command,
72435:                 provider_runtime_context=provider_turn_payload.runtime_context,
72436:                 provider_runtime_env=provider_turn_payload.runtime_env,
72437:                 **(
72438:                     {"standalone_provider_context": True}
72439:                     if provider_context_mode == "standalone"
72440:                     else {}
72441:                 ),
72442:             )
72443:         else:
72444:             assert_provider_user_message_unchanged(
72445:                 provider_turn_payload.user_prompt,
72446:                 prompt,
72447:             )
72448:             task = run_claude(
72449:                 session_id,
72450:                 run_id,
72451:                 provider_turn_payload.user_prompt,
72452:                 dict(sess),
72453:                 manifest_path,
72454:                 interactive_agent_sdk=interactive_agent_sdk,
72455:                 provider_command=resolved_provider_command,
72456:                 provider_runtime_env=provider_turn_payload.runtime_env,
72457:                 **(
72458:                     {"standalone_provider_context": True}
72459:                     if provider_context_mode == "standalone"
72460:                     else {}
72461:                 ),
72462:             )
72463:         turn_task = asyncio.create_task(supervise_provider_turn_task(
72464:             session_id,
72465:             run_id,
72466:             str(backend),
72467:             task,
72468:         ))
72469:         register_session_task(SESSION_TURN_TASKS, session_id, turn_task)
```

## 原文件 88551–88580 行

```python
88551: @app.post("/api/sessions/{session_id}/turns")
88552: async def post_turn(session_id: str, req: TurnRequest) -> dict[str, Any]:
88553:     while True:
88554:         try:
88555:             return await start_turn(session_id, req)
88556:         except ManagedServerUpdatePendingError as exc:
88557:             # The pending fence may be cancelled between admission and this
88558:             # fallback. Revalidate chat lifecycle and the exact fence under the
88559:             # same lock used by archive/delete/start; a generic 503 must never
88560:             # be reinterpreted as permission to bypass normal admission.
88561:             async with session_lifecycle_lock(session_id):
88562:                 ensure_session_not_deleting(session_id)
88563:                 sess = STORE.sessions.get(session_id)
88564:                 if not sess:
88565:                     raise HTTPException(
88566:                         status_code=404,
88567:                         detail="session not found",
88568:                     ) from exc
88569:                 if sess.get("archived"):
88570:                     raise HTTPException(
88571:                         status_code=409,
88572:                         detail="archived chats cannot start turns",
88573:                     ) from exc
88574:                 if not managed_server_update_is_pending():
88575:                     # Cancellation reopened admission. Retry through the full
88576:                     # start path after releasing this lifecycle lock.
88577:                     continue
88578:                 # Accept the user's message durably without materializing a
88579:                 # new run. enqueue_turn owns scheduling once persistence wins.
88580:                 return await enqueue_turn(session_id, req, sess)
```

## 原文件 93894–93989 行

```python
93894: @app.websocket("/api/sessions/{session_id}/events")
93895: async def session_events(
93896:     session_id: str,
93897:     ws: WebSocket,
93898:     after: int = 0,
93899:     visible: bool | None = None,
93900:     reasoning_stream: bool = False,
93901:     reasoning_text: bool = False,
93902: ) -> None:
93903:     selected_subprotocol = websocket_endpoint_subprotocol(
93904:         ws,
93905:         EVENTS_WEBSOCKET_PROTOCOL,
93906:     )
93907:     if not websocket_authorized(ws):
93908:         await ws.accept(subprotocol=selected_subprotocol)
93909:         await ws.close(code=4401)
93910:         return
93911:     if session_id not in STORE.sessions:
93912:         await ws.accept(subprotocol=selected_subprotocol)
93913:         await ws.close(code=4404)
93914:         return
93915:     await ws.accept(subprotocol=selected_subprotocol)
93916:     try:
93917:         if not await HUB.reserve(session_id, ws):
93918:             await close_event_websocket_over_capacity(ws)
93919:             return
93920:         cursor = max(0, int(after or 0))
93921:         # Omitted ``visible`` is the legacy protocol (including released iOS
93922:         # clients): it receives every client-safe event rather than the newer
93923:         # timeline-visible subset. Both protocols still require complete,
93924:         # sequence-bound catch-up; the old single 500-row read silently skipped
93925:         # the rest of a long offline gap.
93926:         catchup_visible = visible is True
93927:         # A durable import holds this lock until its source-proven projection
93928:         # is ready. Reading its fsynced rows earlier can replay raw scheduled
93929:         # inputs before this socket is registered for the repaired broadcast.
93930:         async with event_delivery_lock(session_id):
93931:             await asyncio.to_thread(prepare_provider_history_metadata_repair, session_id)
93932:             boundary = await asyncio.to_thread(
93933:                 last_event_seq_from_file,
93934:                 events_path(session_id),
93935:             )
93936:         while True:
93937:             cursor = await send_event_catchup(
93938:                 session_id,
93939:                 ws,
93940:                 after=cursor,
93941:                 through=boundary,
93942:                 visible=catchup_visible,
93943:             )
93944:             if cursor < boundary:
93945:                 # Never register a socket with an acknowledged hole. A short
93946:                 # scan means the log could not substantiate its own boundary;
93947:                 # live delivery cannot repair that missing historical range.
93948:                 raise RuntimeError(
93949:                     "event catch-up could not reach its stable boundary"
93950:                 )
93951: 
93952:             # No socket I/O occurs while holding the delivery lock. If an
93953:             # append raced the page stream, capture its new fixed boundary,
93954:             # release the lock, and drain it in the next pass. Registration is
93955:             # performed only in a lock-held instant where no gap remains, so a
93956:             # later append observes the subscriber before it broadcasts.
93957:             activated = False
93958:             reasoning_snapshot = None
93959:             async with event_delivery_lock(session_id):
93960:                 gap_boundary = await asyncio.to_thread(
93961:                     last_event_seq_from_file,
93962:                     events_path(session_id),
93963:                 )
93964:                 if cursor >= gap_boundary:
93965:                     activated = await HUB.register_accepted(session_id, ws, **(
93966:                         {"reasoning_stream": True, **({"reasoning_text": True} if reasoning_text else {})} if reasoning_stream else {}))
93967:                     if activated and reasoning_stream:
93968:                         reasoning_snapshot = reasoning_summary_stream_snapshot(session_id)
93969:                         if not reasoning_text:
93970:                             reasoning_snapshot["items"] = [item for item in reasoning_snapshot["items"]
93971:                                 if item.get("phase") != "reasoning"]
93972:             if cursor >= gap_boundary:
93973:                 if not activated:
93974:                     # This should be unreachable after a successful
93975:                     # reservation, but retain retryable overload semantics if
93976:                     # a future lifecycle path releases it early. Socket I/O
93977:                     # remains outside the event-delivery lock.
93978:                     await close_event_websocket_over_capacity(ws)
93979:                     return
93980:                 if reasoning_snapshot is not None:
93981:                     await asyncio.wait_for(ws.send_json(reasoning_snapshot), timeout=WEBSOCKET_SEND_TIMEOUT_SECONDS)
93982:                 break
93983:             boundary = gap_boundary
93984:         while True:
93985:             await ws.receive_text()
93986:     except WebSocketDisconnect:
93987:         pass
93988:     finally:
93989:         await HUB.unsubscribe(session_id, ws)
```
