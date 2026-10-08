# LangGraph Pregel 调度说明（阅读片段）

原始文件：`raw/langgraph-main-2026-10-08-dfec86a82131.py`。通用提取器误按 ASCII 解码失败；此缓存显式按 UTF-8 解码，保留本轮核查的 458–510 行。原始证据保持不变。

```python
458: class Pregel(
459:     PregelProtocol[StateT, ContextT, InputT, OutputT],
460:     Generic[StateT, ContextT, InputT, OutputT],
461: ):
462:     """Pregel manages the runtime behavior for LangGraph applications.
463: 
464:     ## Overview
465: 
466:     Pregel combines [**actors**](https://en.wikipedia.org/wiki/Actor_model)
467:     and **channels** into a single application.
468:     **Actors** read data from channels and write data to channels.
469:     Pregel organizes the execution of the application into multiple steps,
470:     following the **Pregel Algorithm**/**Bulk Synchronous Parallel** model.
471: 
472:     Each step consists of three phases:
473: 
474:     - **Plan**: Determine which **actors** to execute in this step. For example,
475:         in the first step, select the **actors** that subscribe to the special
476:         **input** channels; in subsequent steps,
477:         select the **actors** that subscribe to channels updated in the previous step.
478:     - **Execution**: Execute all selected **actors** in parallel,
479:         until all complete, or one fails, or a timeout is reached. During this
480:         phase, channel updates are invisible to actors until the next step.
481:     - **Update**: Update the channels with the values written by the **actors**
482:         in this step.
483: 
484:     Repeat until no **actors** are selected for execution, or a maximum number of
485:     steps is reached.
486: 
487:     ## Actors
488: 
489:     An **actor** is a `PregelNode`.
490:     It subscribes to channels, reads data from them, and writes data to them.
491:     It can be thought of as an **actor** in the Pregel algorithm.
492:     `PregelNodes` implement LangChain's
493:     Runnable interface.
494: 
495:     ## Channels
496: 
497:     Channels are used to communicate between actors (`PregelNodes`).
498:     Each channel has a value type, an update type, and an update function – which
499:     takes a sequence of updates and
500:     modifies the stored value. Channels can be used to send data from one chain to
501:     another, or to send data from a chain to itself in a future step. LangGraph
502:     provides a number of built-in channels:
503: 
504:     ### Basic channels: LastValue and Topic
505: 
506:     - `LastValue`: The default channel, stores the last value sent to the channel,
507:        useful for input and output values, or for sending data from one step to the next
508:     - `Topic`: A configurable PubSub Topic, useful for sending multiple values
509:        between *actors*, or for accumulating output. Can be configured to deduplicate
510:        values, and/or to accumulate values over the course of multiple steps.
```
