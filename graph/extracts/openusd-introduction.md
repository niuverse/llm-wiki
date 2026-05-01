[Universal Scene Description](index.html)

Learn

* Introduction to USD
* [Introduction to OpenExec](intro_to_openexec.html)
* [Terms and Concepts](glossary.html)
* [Tutorials](tut_usd_tutorials.html)
  + [Hello World - Creating Your First USD Stage](tut_helloworld.html)
  + [Hello World Redux - Using Generic Prims](tut_helloworld_redux.html)
  + [Inspecting and Authoring Properties](tut_inspect_and_author_props.html)
  + [Referencing Layers](tut_referencing_layers.html)
  + [Converting Between Layer Formats](tut_converting_between_layer_formats.html)
  + [Traversing a Stage](tut_traversing_stage.html)
  + [Authoring Variants](tut_authoring_variants.html)
  + [Variants Example in Katana](tut_variants_example_in_katana.html)
  + [Transformations, Animation, and Layer Offsets](tut_xforms.html)
  + [Simple Shading in USD](tut_simple_shading.html)
  + [End to End Example](tut_end_to_end.html)
  + [Houdini USD Example Workflow](tut_houdini_example.html)
  + [Generating New Schema Classes](tut_generating_new_schema.html)
  + [Creating a Usdview Plugin](tut_usdview_plugin.html)
* [Downloads and Videos](dl_downloads.html)
* [Products Using USD](usd_products.html)

User Guides

* [Collections and Patterns](user_guides/collections_and_patterns.html)
  + [Basic Usage](user_guides/collections_and_patterns.html#basic-usage)
    - [Configuring Membership Mode](user_guides/collections_and_patterns.html#configuring-membership-mode)
  + [Relationship-Mode Collections](user_guides/collections_and_patterns.html#relationship-mode-collections)
    - [Configuring Relationship-Mode Collections](user_guides/collections_and_patterns.html#configuring-relationship-mode-collections)
  + [Pattern-Based Collections](user_guides/collections_and_patterns.html#pattern-based-collections)
    - [Path Expressions](user_guides/collections_and_patterns.html#path-expressions)
      * [Path Patterns](user_guides/collections_and_patterns.html#path-patterns)
      * [Additional Expressions Considerations](user_guides/collections_and_patterns.html#additional-expressions-considerations)
    - [Configuring Pattern-Based Collections](user_guides/collections_and_patterns.html#configuring-pattern-based-collections)
    - [Getting the Expression for a Relationship-Mode Collection](user_guides/collections_and_patterns.html#getting-the-expression-for-a-relationship-mode-collection)
* [Color](user_guides/color_user_guide.html)
  + [Working With Color in OpenUSD](user_guides/color_user_guide.html#working-with-color-in-openusd)
    - [Color Spaces Supported by OpenUSD](user_guides/color_user_guide.html#color-spaces-supported-by-openusd)
    - [Working With Color Space Schemas](user_guides/color_user_guide.html#working-with-color-space-schemas)
      * [Color Space Inheritance and Resolution](user_guides/color_user_guide.html#color-space-inheritance-and-resolution)
      * [Default Color Space](user_guides/color_user_guide.html#default-color-space)
  + [What is a Color Space?](user_guides/color_user_guide.html#what-is-a-color-space)
    - [Gamut Limitations and Considerations](user_guides/color_user_guide.html#gamut-limitations-and-considerations)
    - [Common White Points](user_guides/color_user_guide.html#common-white-points)
    - [Linear vs. Non-Linear Spaces](user_guides/color_user_guide.html#linear-vs-non-linear-spaces)
  + [Considerations in Content Creation](user_guides/color_user_guide.html#considerations-in-content-creation)
  + [Glossary of Color Terms](user_guides/color_user_guide.html#glossary-of-color-terms)
* [Namespace Editing](user_guides/namespace_editing.html)
  + [Using UsdNamespaceEditor](user_guides/namespace_editing.html#using-usdnamespaceeditor)
    - [Setting Editor Options](user_guides/namespace_editing.html#setting-editor-options)
    - [Working With Relocates](user_guides/namespace_editing.html#working-with-relocates)
    - [Fixing Paths For Moved Objects](user_guides/namespace_editing.html#fixing-paths-for-moved-objects)
    - [Applying Edits to Dependent Stages](user_guides/namespace_editing.html#applying-edits-to-dependent-stages)
    - [Batch Edits](user_guides/namespace_editing.html#batch-edits)
  + [Namespace Editing Best Practices](user_guides/namespace_editing.html#namespace-editing-best-practices)
    - [Use CanApplyEdits() To Validate Edit Operations](user_guides/namespace_editing.html#use-canapplyedits-to-validate-edit-operations)
    - [Built-In Properties From Schemas Are Not Editable](user_guides/namespace_editing.html#built-in-properties-from-schemas-are-not-editable)
    - [Be Aware of Relocates Performance Impact](user_guides/namespace_editing.html#be-aware-of-relocates-performance-impact)
* [Rendering with USD](user_guides/render_user_guide.html)
  + [Configuring Imageable Content](user_guides/render_user_guide.html#configuring-imageable-content)
    - [Configuring the Stage Coordinate System](user_guides/render_user_guide.html#configuring-the-stage-coordinate-system)
    - [Understanding Render Visibility](user_guides/render_user_guide.html#understanding-render-visibility)
      * [Using the Visibility Attribute](user_guides/render_user_guide.html#using-the-visibility-attribute)
      * [Using Imageable Purpose](user_guides/render_user_guide.html#using-imageable-purpose)
    - [Understanding Intrinsic and Explicit Normals](user_guides/render_user_guide.html#understanding-intrinsic-and-explicit-normals)
  + [Working with Lights](user_guides/render_user_guide.html#working-with-lights)
    - [Using Light-linking to Filter Objects Affected by Lights](user_guides/render_user_guide.html#using-light-linking-to-filter-objects-affected-by-lights)
  + [Working with Materials](user_guides/render_user_guide.html#working-with-materials)
    - [Using the USD Preview Material](user_guides/render_user_guide.html#using-the-usd-preview-material)
      * [Using GLSLFX Shaders](user_guides/render_user_guide.html#using-glslfx-shaders)
    - [Working with Primvars](user_guides/render_user_guide.html#working-with-primvars)
      * [Primvar Interpolation](user_guides/render_user_guide.html#primvar-interpolation)
      * [Indexed Primvars](user_guides/render_user_guide.html#indexed-primvars)
      * [Consuming Primvars in Materials](user_guides/render_user_guide.html#consuming-primvars-in-materials)
      * [Material Primvar Fallbacks](user_guides/render_user_guide.html#material-primvar-fallbacks)
    - [Using Material Binding Purpose](user_guides/render_user_guide.html#using-material-binding-purpose)
    - [Binding Materials to Collections](user_guides/render_user_guide.html#binding-materials-to-collections)
      * [Setting Collection Binding Strength](user_guides/render_user_guide.html#setting-collection-binding-strength)
      * [Combining Collection Binding with Material Binding Purpose](user_guides/render_user_guide.html#combining-collection-binding-with-material-binding-purpose)
    - [Using Material Render Contexts](user_guides/render_user_guide.html#using-material-render-contexts)
  + [Working With Image File Formats](user_guides/render_user_guide.html#working-with-image-file-formats)
    - [Guidelines for All Supported Image Formats](user_guides/render_user_guide.html#guidelines-for-all-supported-image-formats)
    - [JPEG](user_guides/render_user_guide.html#jpeg)
    - [PNG](user_guides/render_user_guide.html#png)
    - [OpenEXR](user_guides/render_user_guide.html#openexr)
    - [AV1 Image File Format (AVIF)](user_guides/render_user_guide.html#av1-image-file-format-avif)
  + [Defining the Render Camera](user_guides/render_user_guide.html#defining-the-render-camera)
    - [Configuring Motion Blur](user_guides/render_user_guide.html#configuring-motion-blur)
  + [Configuring Render Settings](user_guides/render_user_guide.html#configuring-render-settings)
* [Primvars](user_guides/primvars.html)
  + [Primvar Interpolation Modes](user_guides/primvars.html#primvar-interpolation-modes)
    - [Constant Interpolation](user_guides/primvars.html#constant-interpolation)
    - [Uniform Interpolation](user_guides/primvars.html#uniform-interpolation)
    - [Vertex Interpolation](user_guides/primvars.html#vertex-interpolation)
    - [Varying Interpolation](user_guides/primvars.html#varying-interpolation)
    - [faceVarying Interpolation](user_guides/primvars.html#facevarying-interpolation)
  + [Primvars and the Scene Namespace](user_guides/primvars.html#primvars-and-the-scene-namespace)
  + [Indexed Primvars](user_guides/primvars.html#indexed-primvars)
    - [Indexed Primvars and Attribute Blocks](user_guides/primvars.html#indexed-primvars-and-attribute-blocks)
  + [Primvar Element Size](user_guides/primvars.html#primvar-element-size)
* [Schema Domains](user_guides/schemas/index.html)
  + [Lights (usdLux)](user_guides/schemas/usdLux/usdLux_toc.html)
    - [Overview](user_guides/schemas/usdLux/overview.html)
      * [UsdLux Schemas and Concepts](user_guides/schemas/usdLux/overview.html#usdlux-schemas-and-concepts)
      * [Light Units](user_guides/schemas/usdLux/overview.html#light-units)
      * [Understanding Light Contributions](user_guides/schemas/usdLux/overview.html#understanding-light-contributions)
      * [Light Shaping](user_guides/schemas/usdLux/overview.html#light-shaping)
      * [Shadows](user_guides/schemas/usdLux/overview.html#shadows)
      * [Mesh Lights](user_guides/schemas/usdLux/overview.html#mesh-lights)
      * [Light-linking and Shadow-linking](user_guides/schemas/usdLux/overview.html#light-linking-and-shadow-linking)
    - [BoundableLightBase](user_guides/schemas/usdLux/BoundableLightBase.html)
      * [Properties](user_guides/schemas/usdLux/BoundableLightBase.html#properties)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdLux/BoundableLightBase.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/BoundableLightBase.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/BoundableLightBase.html#inherited-properties-imageable)
    - [CylinderLight](user_guides/schemas/usdLux/CylinderLight.html)
      * [Properties](user_guides/schemas/usdLux/CylinderLight.html#properties)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdLux/CylinderLight.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/CylinderLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/CylinderLight.html#inherited-properties-imageable)
    - [DiskLight](user_guides/schemas/usdLux/DiskLight.html)
      * [Properties](user_guides/schemas/usdLux/DiskLight.html#properties)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdLux/DiskLight.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/DiskLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/DiskLight.html#inherited-properties-imageable)
    - [DistantLight](user_guides/schemas/usdLux/DistantLight.html)
      * [Properties](user_guides/schemas/usdLux/DistantLight.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/DistantLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/DistantLight.html#inherited-properties-imageable)
    - [DomeLight](user_guides/schemas/usdLux/DomeLight.html)
      * [Properties](user_guides/schemas/usdLux/DomeLight.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/DomeLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/DomeLight.html#inherited-properties-imageable)
    - [DomeLight\_1](user_guides/schemas/usdLux/DomeLight_1.html)
      * [Properties](user_guides/schemas/usdLux/DomeLight_1.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/DomeLight_1.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/DomeLight_1.html#inherited-properties-imageable)
    - [GeometryLight](user_guides/schemas/usdLux/GeometryLight.html)
      * [Properties](user_guides/schemas/usdLux/GeometryLight.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/GeometryLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/GeometryLight.html#inherited-properties-imageable)
    - [LightAPI](user_guides/schemas/usdLux/LightAPI.html)
      * [Properties](user_guides/schemas/usdLux/LightAPI.html#properties)
    - [LightFilter](user_guides/schemas/usdLux/LightFilter.html)
      * [Properties](user_guides/schemas/usdLux/LightFilter.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/LightFilter.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/LightFilter.html#inherited-properties-imageable)
    - [LightListAPI](user_guides/schemas/usdLux/LightListAPI.html)
      * [Properties](user_guides/schemas/usdLux/LightListAPI.html#properties)
    - [ListAPI](user_guides/schemas/usdLux/ListAPI.html)
      * [Properties](user_guides/schemas/usdLux/ListAPI.html#properties)
    - [MeshLightAPI](user_guides/schemas/usdLux/MeshLightAPI.html)
      * [Properties](user_guides/schemas/usdLux/MeshLightAPI.html#properties)
    - [NonboundableLightBase](user_guides/schemas/usdLux/NonboundableLightBase.html)
      * [Properties](user_guides/schemas/usdLux/NonboundableLightBase.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/NonboundableLightBase.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/NonboundableLightBase.html#inherited-properties-imageable)
    - [PluginLight](user_guides/schemas/usdLux/PluginLight.html)
      * [Properties](user_guides/schemas/usdLux/PluginLight.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/PluginLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/PluginLight.html#inherited-properties-imageable)
    - [PluginLightFilter](user_guides/schemas/usdLux/PluginLightFilter.html)
      * [Properties](user_guides/schemas/usdLux/PluginLightFilter.html#properties)
      * [Inherited Properties (LightFilter)](user_guides/schemas/usdLux/PluginLightFilter.html#inherited-properties-lightfilter)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/PluginLightFilter.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/PluginLightFilter.html#inherited-properties-imageable)
    - [PortalLight](user_guides/schemas/usdLux/PortalLight.html)
      * [Properties](user_guides/schemas/usdLux/PortalLight.html#properties)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdLux/PortalLight.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/PortalLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/PortalLight.html#inherited-properties-imageable)
    - [RectLight](user_guides/schemas/usdLux/RectLight.html)
      * [Properties](user_guides/schemas/usdLux/RectLight.html#properties)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdLux/RectLight.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/RectLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/RectLight.html#inherited-properties-imageable)
    - [ShadowAPI](user_guides/schemas/usdLux/ShadowAPI.html)
      * [Properties](user_guides/schemas/usdLux/ShadowAPI.html#properties)
    - [ShapingAPI](user_guides/schemas/usdLux/ShapingAPI.html)
      * [Properties](user_guides/schemas/usdLux/ShapingAPI.html#properties)
    - [SphereLight](user_guides/schemas/usdLux/SphereLight.html)
      * [Properties](user_guides/schemas/usdLux/SphereLight.html#properties)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdLux/SphereLight.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdLux/SphereLight.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdLux/SphereLight.html#inherited-properties-imageable)
    - [VolumeLightAPI](user_guides/schemas/usdLux/VolumeLightAPI.html)
      * [Properties](user_guides/schemas/usdLux/VolumeLightAPI.html#properties)
  + [Media (usdMedia)](user_guides/schemas/usdMedia/usdMedia_toc.html)
    - [Overview](user_guides/schemas/usdMedia/overview.html)
      * [Working With Media](user_guides/schemas/usdMedia/overview.html#working-with-media)
    - [AssetPreviewsAPI](user_guides/schemas/usdMedia/AssetPreviewsAPI.html)
    - [SpatialAudio](user_guides/schemas/usdMedia/SpatialAudio.html)
      * [SpatialAudio and Layer Offsets](user_guides/schemas/usdMedia/SpatialAudio.html#spatialaudio-and-layer-offsets)
      * [Properties](user_guides/schemas/usdMedia/SpatialAudio.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdMedia/SpatialAudio.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdMedia/SpatialAudio.html#inherited-properties-imageable)
  + [Render (usdRender)](user_guides/schemas/usdRender/usdRender_toc.html)
    - [Overview](user_guides/schemas/usdRender/overview.html)
      * [Best Practices](user_guides/schemas/usdRender/overview.html#best-practices)
      * [Using UsdRender to Control How Prims Are Rendered](user_guides/schemas/usdRender/overview.html#using-usdrender-to-control-how-prims-are-rendered)
      * [Working with RenderProduct](user_guides/schemas/usdRender/overview.html#working-with-renderproduct)
      * [Configuring Multi-pass Renders with RenderPass](user_guides/schemas/usdRender/overview.html#configuring-multi-pass-renders-with-renderpass)
    - [RenderPass](user_guides/schemas/usdRender/RenderPass.html)
      * [Properties](user_guides/schemas/usdRender/RenderPass.html#properties)
    - [RenderProduct](user_guides/schemas/usdRender/RenderProduct.html)
      * [Properties](user_guides/schemas/usdRender/RenderProduct.html#properties)
      * [Inherited Properties (RenderSettingsBase)](user_guides/schemas/usdRender/RenderProduct.html#inherited-properties-rendersettingsbase)
    - [RenderSettings](user_guides/schemas/usdRender/RenderSettings.html)
      * [Properties](user_guides/schemas/usdRender/RenderSettings.html#properties)
      * [Inherited Properties (RenderSettingsBase)](user_guides/schemas/usdRender/RenderSettings.html#inherited-properties-rendersettingsbase)
    - [RenderSettingsBase](user_guides/schemas/usdRender/RenderSettingsBase.html)
      * [Properties](user_guides/schemas/usdRender/RenderSettingsBase.html#properties)
    - [RenderVar](user_guides/schemas/usdRender/RenderVar.html)
      * [Properties](user_guides/schemas/usdRender/RenderVar.html#properties)
  + [UI (usdUI)](user_guides/schemas/usdUI/usdUI_toc.html)
    - [Overview](user_guides/schemas/usdUI/overview.html)
      * [Working With Node Graphs](user_guides/schemas/usdUI/overview.html#working-with-node-graphs)
      * [Working With Accessibility Information](user_guides/schemas/usdUI/overview.html#working-with-accessibility-information)
      * [Working With UI Hints](user_guides/schemas/usdUI/overview.html#working-with-ui-hints)
    - [AttributeHints](user_guides/schemas/usdUI/AttributeHints.html)
      * [AttributeHints fields](user_guides/schemas/usdUI/AttributeHints.html#attributehints-fields)
    - [ObjectHints](user_guides/schemas/usdUI/ObjectHints.html)
      * [ObjectHints fields](user_guides/schemas/usdUI/ObjectHints.html#objecthints-fields)
    - [PrimHints](user_guides/schemas/usdUI/PrimHints.html)
      * [PrimHints fields](user_guides/schemas/usdUI/PrimHints.html#primhints-fields)
    - [PropertyHints](user_guides/schemas/usdUI/PropertyHints.html)
      * [PropertyHints fields](user_guides/schemas/usdUI/PropertyHints.html#propertyhints-fields)
    - [AccessibilityAPI](user_guides/schemas/usdUI/AccessibilityAPI.html)
      * [Properties](user_guides/schemas/usdUI/AccessibilityAPI.html#properties)
    - [Backdrop](user_guides/schemas/usdUI/Backdrop.html)
      * [Properties](user_guides/schemas/usdUI/Backdrop.html#properties)
    - [NodeGraphNodeAPI](user_guides/schemas/usdUI/NodeGraphNodeAPI.html)
      * [Properties](user_guides/schemas/usdUI/NodeGraphNodeAPI.html#properties)
    - [SceneGraphPrimAPI](user_guides/schemas/usdUI/SceneGraphPrimAPI.html)
      * [Properties](user_guides/schemas/usdUI/SceneGraphPrimAPI.html#properties)
  + [Volumes (usdVol)](user_guides/schemas/usdVol/usdVol_toc.html)
    - [Overview](user_guides/schemas/usdVol/overview.html)
      * [Working With Volumes](user_guides/schemas/usdVol/overview.html#working-with-volumes)
      * [Working With Fields](user_guides/schemas/usdVol/overview.html#working-with-fields)
      * [Working With Particle Fields](user_guides/schemas/usdVol/overview.html#working-with-particle-fields)
    - [Field3DAsset](user_guides/schemas/usdVol/Field3DAsset.html)
      * [Properties](user_guides/schemas/usdVol/Field3DAsset.html#properties)
      * [Inherited Properties (VolumeFieldAsset)](user_guides/schemas/usdVol/Field3DAsset.html#inherited-properties-volumefieldasset)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/Field3DAsset.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/Field3DAsset.html#inherited-properties-imageable)
    - [FieldAsset](user_guides/schemas/usdVol/FieldAsset.html)
      * [Properties](user_guides/schemas/usdVol/FieldAsset.html#properties)
      * [Inherited Properties (VolumeFieldAsset)](user_guides/schemas/usdVol/FieldAsset.html#inherited-properties-volumefieldasset)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/FieldAsset.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/FieldAsset.html#inherited-properties-imageable)
    - [FieldBase](user_guides/schemas/usdVol/FieldBase.html)
      * [Properties](user_guides/schemas/usdVol/FieldBase.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/FieldBase.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/FieldBase.html#inherited-properties-imageable)
    - [OpenVDBAsset](user_guides/schemas/usdVol/OpenVDBAsset.html)
      * [Properties](user_guides/schemas/usdVol/OpenVDBAsset.html#properties)
      * [Inherited Properties (VolumeFieldAsset)](user_guides/schemas/usdVol/OpenVDBAsset.html#inherited-properties-volumefieldasset)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/OpenVDBAsset.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/OpenVDBAsset.html#inherited-properties-imageable)
    - [ParticleField](user_guides/schemas/usdVol/ParticleField.html)
      * [Properties](user_guides/schemas/usdVol/ParticleField.html#properties)
      * [Inherited Properties (Gprim)](user_guides/schemas/usdVol/ParticleField.html#inherited-properties-gprim)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdVol/ParticleField.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/ParticleField.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/ParticleField.html#inherited-properties-imageable)
    - [ParticleField3DGaussianSplat](user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html)
      * [Properties](user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html#properties)
      * [Inherited Properties (Gprim)](user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html#inherited-properties-gprim)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/ParticleField3DGaussianSplat.html#inherited-properties-imageable)
    - [ParticleFieldKernelBaseAPI](user_guides/schemas/usdVol/ParticleFieldKernelBaseAPI.html)
    - [ParticleFieldKernelConstantSurfletAPI](user_guides/schemas/usdVol/ParticleFieldKernelConstantSurfletAPI.html)
    - [ParticleFieldKernelGaussianEllipsoidAPI](user_guides/schemas/usdVol/ParticleFieldKernelGaussianEllipsoidAPI.html)
    - [ParticleFieldKernelGaussianSurfletAPI](user_guides/schemas/usdVol/ParticleFieldKernelGaussianSurfletAPI.html)
    - [ParticleFieldOpacityAttributeAPI](user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html)
      * [Properties](user_guides/schemas/usdVol/ParticleFieldOpacityAttributeAPI.html#properties)
    - [ParticleFieldOrientationAttributeAPI](user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html)
      * [Properties](user_guides/schemas/usdVol/ParticleFieldOrientationAttributeAPI.html#properties)
    - [ParticleFieldPositionAttributeAPI](user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html)
      * [Properties](user_guides/schemas/usdVol/ParticleFieldPositionAttributeAPI.html#properties)
    - [ParticleFieldPositionBaseAPI](user_guides/schemas/usdVol/ParticleFieldPositionBaseAPI.html)
    - [ParticleFieldRadianceBaseAPI](user_guides/schemas/usdVol/ParticleFieldRadianceBaseAPI.html)
    - [ParticleFieldScaleAttributeAPI](user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html)
      * [Properties](user_guides/schemas/usdVol/ParticleFieldScaleAttributeAPI.html#properties)
    - [ParticleFieldSphericalHarmonicsAttributeAPI](user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html)
      * [Properties](user_guides/schemas/usdVol/ParticleFieldSphericalHarmonicsAttributeAPI.html#properties)
    - [Volume](user_guides/schemas/usdVol/Volume.html)
      * [Properties](user_guides/schemas/usdVol/Volume.html#properties)
      * [Inherited Properties (Gprim)](user_guides/schemas/usdVol/Volume.html#inherited-properties-gprim)
      * [Inherited Properties (Boundable)](user_guides/schemas/usdVol/Volume.html#inherited-properties-boundable)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/Volume.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/Volume.html#inherited-properties-imageable)
    - [VolumeFieldAsset](user_guides/schemas/usdVol/VolumeFieldAsset.html)
      * [Properties](user_guides/schemas/usdVol/VolumeFieldAsset.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/VolumeFieldAsset.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/VolumeFieldAsset.html#inherited-properties-imageable)
    - [VolumeFieldBase](user_guides/schemas/usdVol/VolumeFieldBase.html)
      * [Properties](user_guides/schemas/usdVol/VolumeFieldBase.html#properties)
      * [Inherited Properties (Xformable)](user_guides/schemas/usdVol/VolumeFieldBase.html#inherited-properties-xformable)
      * [Inherited Properties (Imageable)](user_guides/schemas/usdVol/VolumeFieldBase.html#inherited-properties-imageable)
* [Time and Animated Values](user_guides/time_and_animated_values.html)
  + [Understanding TimeCodes](user_guides/time_and_animated_values.html#understanding-timecodes)
    - [Working With TimeCodes Programmatically](user_guides/time_and_animated_values.html#working-with-timecodes-programmatically)
    - [Mapping TimeCodes to Real Time](user_guides/time_and_animated_values.html#mapping-timecodes-to-real-time)
    - [Specifying Layer Start and End Times](user_guides/time_and_animated_values.html#specifying-layer-start-and-end-times)
    - [Using TimeCode Ranges](user_guides/time_and_animated_values.html#using-timecode-ranges)
    - [Working with Automatic and Explicit TimeCode Remapping Across Composition](user_guides/time_and_animated_values.html#working-with-automatic-and-explicit-timecode-remapping-across-composition)
      * [Automatic Scaling of timeCodesPerSecond](user_guides/time_and_animated_values.html#automatic-scaling-of-timecodespersecond)
      * [Configuring TimeCode Scaling and Offsets Using LayerOffsets](user_guides/time_and_animated_values.html#configuring-timecode-scaling-and-offsets-using-layeroffsets)
      * [Combining Automatic Scaling and Layer Offsets](user_guides/time_and_animated_values.html#combining-automatic-scaling-and-layer-offsets)
* [Variable Expressions](user_guides/variable_expressions.html)
  + [Defining Expression Variables in a Layer](user_guides/variable_expressions.html#defining-expression-variables-in-a-layer)
    - [string](user_guides/variable_expressions.html#string)
    - [bool](user_guides/variable_expressions.html#bool)
    - [int64](user_guides/variable_expressions.html#int64)
    - [<type>[]](user_guides/variable_expressions.html#type)
    - [None](user_guides/variable_expressions.html#none)
    - [Expression Variables and Composition](user_guides/variable_expressions.html#expression-variables-and-composition)
  + [Authoring Variable Expressions](user_guides/variable_expressions.html#authoring-variable-expressions)
  + [Expression Function Reference](user_guides/variable_expressions.html#expression-function-reference)
    - [defined(<variable name>, …)](user_guides/variable_expressions.html#defined-variable-name)
    - [if(<condition>, <true-value>, <false-value>)](user_guides/variable_expressions.html#if-condition-true-value-false-value)
    - [if(<condition>, <true-value>)](user_guides/variable_expressions.html#if-condition-true-value)
    - [and(<x>, <y>, …)](user_guides/variable_expressions.html#and-x-y)
    - [or(<x>, <y>, …)](user_guides/variable_expressions.html#or-x-y)
    - [not(<x>)](user_guides/variable_expressions.html#not-x)
    - [eq(<x>, <y>)](user_guides/variable_expressions.html#eq-x-y)
    - [neq(<x>, <y>)](user_guides/variable_expressions.html#neq-x-y)
    - [lt(<x>, <y>)](user_guides/variable_expressions.html#lt-x-y)
    - [leq(<x>, <y>)](user_guides/variable_expressions.html#leq-x-y)
    - [gt(<x>, <y>)](user_guides/variable_expressions.html#gt-x-y)
    - [geq(<x>, <y>)](user_guides/variable_expressions.html#geq-x-y)
    - [contains(<list\_or\_string>, <value>)](user_guides/variable_expressions.html#contains-list-or-string-value)
    - [at(<list\_or\_string>, <index>)](user_guides/variable_expressions.html#at-list-or-string-index)
    - [len(<list\_or\_string>)](user_guides/variable_expressions.html#len-list-or-string)
  + [Examples](user_guides/variable_expressions.html#examples)
    - [Flexible Variant Selections](user_guides/variable_expressions.html#flexible-variant-selections)
    - [Asset-valued Texture File Attribute](user_guides/variable_expressions.html#asset-valued-texture-file-attribute)
    - [Conditionally Include Sublayers](user_guides/variable_expressions.html#conditionally-include-sublayers)

Reference

* [API Documentation](apiDocs.html)
* [Toolset](toolset.html)
  + [usdedit](toolset.html#usdedit)
  + [usdcat](toolset.html#usdcat)
  + [usddiff](toolset.html#usddiff)
  + [usdview](toolset.html#usdview)
  + [usdrecord](toolset.html#usdrecord)
  + [usdresolve](toolset.html#usdresolve)
  + [usdtree](toolset.html#usdtree)
  + [usdzip](toolset.html#usdzip)
  + [usdchecker](toolset.html#usdchecker)
  + [usdfixbrokenpixarschemas](toolset.html#usdfixbrokenpixarschemas)
  + [usdstitch](toolset.html#usdstitch)
  + [usdstitchclips](toolset.html#usdstitchclips)
  + [usddumpcrate](toolset.html#usddumpcrate)
  + [sdfdump](toolset.html#sdfdump)
  + [sdffilter](toolset.html#sdffilter)
  + [usdmeasureperformance](toolset.html#usdmeasureperformance)
  + [usdGenSchema](toolset.html#usdgenschema)
  + [usdgenschemafromsdr](toolset.html#usdgenschemafromsdr)
  + [usdInitSchema](toolset.html#usdinitschema)
* [Specifications](spec.html)
  + [USD Core Specification](https://aousd.org/blog/foundations-of-open-3d-development-introducing-aousd-core-specification-1-0/)
  + [UsdPreviewSurface Specification](spec_usdpreviewsurface.html)
    - [Goal](spec_usdpreviewsurface.html#goal)
    - [Core Nodes](spec_usdpreviewsurface.html#core-nodes)
      * [Preview Surface](spec_usdpreviewsurface.html#preview-surface)
      * [Texture Reader](spec_usdpreviewsurface.html#texture-reader)
      * [Primvar Reader](spec_usdpreviewsurface.html#primvar-reader)
      * [Transform2d](spec_usdpreviewsurface.html#transform2d)
    - [USD Sample](spec_usdpreviewsurface.html#usd-sample)
    - [Other Notes](spec_usdpreviewsurface.html#other-notes)
      * [Texture Coordinate Orientation in USD](spec_usdpreviewsurface.html#texture-coordinate-orientation-in-usd)
      * [Roughness vs Glossiness](spec_usdpreviewsurface.html#roughness-vs-glossiness)
    - [Changes, by Version](spec_usdpreviewsurface.html#changes-by-version)
      * [Version 2.0 - Initial Public Specification](spec_usdpreviewsurface.html#version-2-0-initial-public-specification)
      * [Version 2.2 - Before Type Changes](spec_usdpreviewsurface.html#version-2-2-before-type-changes)
      * [Version 2.3](spec_usdpreviewsurface.html#version-2-3)
      * [Version 2.4](spec_usdpreviewsurface.html#version-2-4)
      * [Version 2.5](spec_usdpreviewsurface.html#version-2-5)
      * [Version 2.6 - Current Head](spec_usdpreviewsurface.html#version-2-6-current-head)
  + [Usdz File Format Specification](spec_usdz.html)
    - [Purpose](spec_usdz.html#purpose)
    - [Usdz Specification](spec_usdz.html#usdz-specification)
      * [Foundation](spec_usdz.html#foundation)
      * [Zip Constraints](spec_usdz.html#zip-constraints)
      * [Layout](spec_usdz.html#layout)
      * [File Types](spec_usdz.html#file-types)
      * [USD Constraints](spec_usdz.html#usd-constraints)
      * [Editability](spec_usdz.html#editability)
      * [Accessibility](spec_usdz.html#accessibility)
    - [Packaging Considerations for Streaming and Encapsulation](spec_usdz.html#packaging-considerations-for-streaming-and-encapsulation)
      * [File Ordering Within Package for Streaming](spec_usdz.html#file-ordering-within-package-for-streaming)
      * [For Reproducible Results, Encapsulate Using Anchored Asset Paths](spec_usdz.html#usdz-reproducibleresults)
    - [MIME Type](spec_usdz.html#mime-type)
    - [Toolset](spec_usdz.html#toolset)
    - [Changes, by Version](spec_usdz.html#changes-by-version)
      * [Version 1.3 - Current Head](spec_usdz.html#version-1-3-current-head)
* [Proposals](wp.html)
  + [Adapting UsdLux to Accommodate Geometry Lights](wp_usdlux_for_geometry_lights.html)
    - [Introduction and Background](wp_usdlux_for_geometry_lights.html#introduction-and-background)
      * [Mesh Light Support in the Industry](wp_usdlux_for_geometry_lights.html#mesh-light-support-in-the-industry)
      * [Goals](wp_usdlux_for_geometry_lights.html#goals)
      * [Workflow Considerations](wp_usdlux_for_geometry_lights.html#workflow-considerations)
    - [Design Space and Issues](wp_usdlux_for_geometry_lights.html#design-space-and-issues)
      * [Dual-Prim Geometry Light Problems](wp_usdlux_for_geometry_lights.html#dual-prim-geometry-light-problems)
      * [Single-Prim Geometry Light](wp_usdlux_for_geometry_lights.html#single-prim-geometry-light)
    - [UsdLux LightAPI OM](wp_usdlux_for_geometry_lights.html#usdlux-lightapi-om)
      * [Light -> LightAPI](wp_usdlux_for_geometry_lights.html#light-lightapi)
      * [Introduce Convenience Base Classes](wp_usdlux_for_geometry_lights.html#introduce-convenience-base-classes)
      * [Preserve Existing UsdLux Concrete Schemas](wp_usdlux_for_geometry_lights.html#preserve-existing-usdlux-concrete-schemas)
      * [Deprecate GeometryLight](wp_usdlux_for_geometry_lights.html#deprecate-geometrylight)
      * [How do we Identify the Appropriate SdrShaderNode for a Light?](wp_usdlux_for_geometry_lights.html#how-do-we-identify-the-appropriate-sdrshadernode-for-a-light)
      * [Lights with Materials?](wp_usdlux_for_geometry_lights.html#lights-with-materials)
    - [Proposal and Behaviors](wp_usdlux_for_geometry_lights.html#proposal-and-behaviors)
      * [Shading and Emission](wp_usdlux_for_geometry_lights.html#shading-and-emission)
      * [Volumes](wp_usdlux_for_geometry_lights.html#volumes)
      * [Primvars in Light Networks](wp_usdlux_for_geometry_lights.html#primvars-in-light-networks)
  + [Adapting UsdLux to the Needs of Renderers](wp_usdlux_for_renderers.html)
    - [Background and Goals](wp_usdlux_for_renderers.html#background-and-goals)
    - [Foundational Technologies in USD](wp_usdlux_for_renderers.html#foundational-technologies-in-usd)
      * [Sdr](wp_usdlux_for_renderers.html#sdr)
      * [USD Schemas](wp_usdlux_for_renderers.html#usd-schemas)
      * [UsdImaging and Hydra](wp_usdlux_for_renderers.html#usdimaging-and-hydra)
    - [Proposals](wp_usdlux_for_renderers.html#proposals)
      * [Changes to UsdLux](wp_usdlux_for_renderers.html#changes-to-usdlux)
      * [Changes to UsdImaging](wp_usdlux_for_renderers.html#changes-to-usdimaging)
      * [Changes to Hd](wp_usdlux_for_renderers.html#changes-to-hd)
      * [Changes to HdPrman and Other Render Delegates](wp_usdlux_for_renderers.html#changes-to-hdprman-and-other-render-delegates)
  + [Asset Previews in USD](wp_asset_previews.html)
    - [Introduction](wp_asset_previews.html#introduction)
    - [Proposal](wp_asset_previews.html#proposal)
      * [Object Model](wp_asset_previews.html#object-model)
      * [Concrete Encoding](wp_asset_previews.html#concrete-encoding)
    - [Schema](wp_asset_previews.html#schema)
  + [Asset Resolution (Ar) 2.0](wp_ar2.html)
    - [Background and Goals](wp_ar2.html#background-and-goals)
    - [Tasks](wp_ar2.html#tasks)
      * [General Cleanup](wp_ar2.html#general-cleanup)
      * [Add Documentation and Examples](wp_ar2.html#add-documentation-and-examples)
      * [Add Identifier Concept](wp_ar2.html#add-identifier-concept)
      * [Remove Repository and Search Path](wp_ar2.html#remove-repository-and-search-path)
      * [Improve Resolve and Asset Info](wp_ar2.html#improve-resolve-and-asset-info)
      * [Remove Filesystem-specific Code](wp_ar2.html#remove-filesystem-specific-code)
      * [Add Asset Writing Interface](wp_ar2.html#add-asset-writing-interface)
      * [Add URI Resolvers](wp_ar2.html#add-uri-resolvers)
      * [Allow Creation of ArResolverContext From Strings](wp_ar2.html#allow-creation-of-arresolvercontext-from-strings)
      * [Remove ArResolver::ConfigureResolverForAsset](wp_ar2.html#remove-arresolver-configureresolverforasset)
    - [Rollout and Transition](wp_ar2.html#rollout-and-transition)
    - [Proposed API](wp_ar2.html#proposed-api)
  + [Coordinate Systems in USD Proposal](wp_coordsys.html)
    - [Purpose](wp_coordsys.html#purpose)
    - [Requirements](wp_coordsys.html#requirements)
      * [Coordinate Systems are Identified by Name in Shaders](wp_coordsys.html#coordinate-systems-are-identified-by-name-in-shaders)
    - [Proposed API Schema](wp_coordsys.html#proposed-api-schema)
      * [Recording a Frame of Reference](wp_coordsys.html#recording-a-frame-of-reference)
      * [Binding Frames of Reference](wp_coordsys.html#binding-frames-of-reference)
      * [CoordSysAPI](wp_coordsys.html#coordsysapi)
    - [USD Sample and Analysis](wp_coordsys.html#usd-sample-and-analysis)
      * [Analysis: Coordinate Systems Evaluated](wp_coordsys.html#analysis-coordinate-systems-evaluated)
      * [Analysis: Coordinate System Binding and Consumption](wp_coordsys.html#analysis-coordinate-system-binding-and-consumption)
    - [Projections, Cameras, and CoordSysAPI](wp_coordsys.html#projections-cameras-and-coordsysapi)
  + [Generalizing Connectable Nodes Beyond UsdShade](wp_connectable_nodes.html)
    - [Background and Goals](wp_connectable_nodes.html#background-and-goals)
    - [Proposal](wp_connectable_nodes.html#proposal)
      * [Node Definition as API Schema](wp_connectable_nodes.html#node-definition-as-api-schema)
      * [Plugin-defined ConnectableAPI Behavior](wp_connectable_nodes.html#plugin-defined-connectableapi-behavior)
      * [Connectability Rules for UsdShade Types](wp_connectable_nodes.html#connectability-rules-for-usdshade-types)
      * [Intended use in UsdLux and UsdRi (RenderMan USD schema)](wp_connectable_nodes.html#intended-use-in-usdlux-and-usdri-renderman-usd-schema)
    - [Discussion](wp_connectable_nodes.html#discussion)
      * [Sdr & Ndr](wp_connectable_nodes.html#sdr-ndr)
      * [Flexibility of Connectability Callbacks](wp_connectable_nodes.html#flexibility-of-connectability-callbacks)
      * [Non-shading Networks](wp_connectable_nodes.html#non-shading-networks)
  + [Render Settings in USD Proposal](wp_render_settings.html)
    - [Purpose and Scope](wp_render_settings.html#purpose-and-scope)
    - [Overall Design and Concerns](wp_render_settings.html#overall-design-and-concerns)
    - [Concrete Schemas](wp_render_settings.html#concrete-schemas)
      * [Renderer-Specific Schemas](wp_render_settings.html#renderer-specific-schemas)
    - [Prim and Scene Organization](wp_render_settings.html#prim-and-scene-organization)
      * [Discovering Render Settings](wp_render_settings.html#discovering-render-settings)
      * [Selecting and Combining Render Settings](wp_render_settings.html#selecting-and-combining-render-settings)
      * [Grouping RenderVars and RenderProducts](wp_render_settings.html#grouping-rendervars-and-renderproducts)
      * [Discovering All Potential Shader-based RenderVars](wp_render_settings.html#discovering-all-potential-shader-based-rendervars)
    - [Workflow Considerations](wp_render_settings.html#workflow-considerations)
      * [Interactive vs. Batch Rendering](wp_render_settings.html#interactive-vs-batch-rendering)
    - [Examples](wp_render_settings.html#examples)
    - [Discussion and Questions](wp_render_settings.html#discussion-and-questions)
      * [ID variables](wp_render_settings.html#id-variables)
      * [Stereo Rendering](wp_render_settings.html#stereo-rendering)
      * [Camera Exposure Curves](wp_render_settings.html#camera-exposure-curves)
      * [Denoising, Color Correction, and Tasks](wp_render_settings.html#denoising-color-correction-and-tasks)
      * [Why Locality of Overrides is Valuable](wp_render_settings.html#why-locality-of-overrides-is-valuable)
      * [Image-Mapping-Related Options on Camera or RenderSettings?](wp_render_settings.html#image-mapping-related-options-on-camera-or-rendersettings)
      * [Crop Windows and Region-of-Interest](wp_render_settings.html#crop-windows-and-region-of-interest)
  + [Rigid Body Physics in USD Proposal](wp_rigid_body_physics.html)
    - [Purpose and Scope](wp_rigid_body_physics.html#purpose-and-scope)
    - [Overall Design Concerns](wp_rigid_body_physics.html#overall-design-concerns)
      * [Rigid Body Simulation Primer](wp_rigid_body_physics.html#rigid-body-simulation-primer)
      * [USD Implementation](wp_rigid_body_physics.html#usd-implementation)
    - [Concrete Schemas](wp_rigid_body_physics.html#concrete-schemas)
    - [Examples](wp_rigid_body_physics.html#examples)
      * [Box on Box](wp_rigid_body_physics.html#box-on-box)
      * [Box on Quad](wp_rigid_body_physics.html#box-on-quad)
      * [Spheres with Materials](wp_rigid_body_physics.html#spheres-with-materials)
      * [Group Filtering](wp_rigid_body_physics.html#group-filtering)
      * [Pair Filtering](wp_rigid_body_physics.html#pair-filtering)
      * [Joint](wp_rigid_body_physics.html#joint)
      * [Distance Joint](wp_rigid_body_physics.html#distance-joint)
  + [Schema Versioning in USD](wp_schema_versioning.html)
    - [Introduction](wp_schema_versioning.html#introduction)
      * [Challenges to Schema Versioning in USD](wp_schema_versioning.html#challenges-to-schema-versioning-in-usd)
    - [Proposal for Per-Schema Versioning](wp_schema_versioning.html#proposal-for-per-schema-versioning)
      * [Version Representation in Schemas](wp_schema_versioning.html#version-representation-in-schemas)
      * [Schema Registry](wp_schema_versioning.html#schema-registry)
      * [UsdPrim Schema-related API](wp_schema_versioning.html#usdprim-schema-related-api)
      * [Considerations for Auto-apply API Schemas](wp_schema_versioning.html#considerations-for-auto-apply-api-schemas)
    - [Risks, Questions, Limitations](wp_schema_versioning.html#risks-questions-limitations)
    - [Guidelines for Schema Versioning](wp_schema_versioning.html#guidelines-for-schema-versioning)
      * [Criteria for Versioning](wp_schema_versioning.html#criteria-for-versioning)
      * [Do not Version a Schema When…](wp_schema_versioning.html#do-not-version-a-schema-when)
      * [Do Version a Schema When…](wp_schema_versioning.html#do-version-a-schema-when)
    - [Pixar Examples, Past and Future](wp_schema_versioning.html#pixar-examples-past-and-future)
      * [UsdLux Connectability](wp_schema_versioning.html#usdlux-connectability)
      * [Light → LightAPI](wp_schema_versioning.html#light-lightapi)
      * [Visibility to VisibilityAPI](wp_schema_versioning.html#visibility-to-visibilityapi)
    - [Possible Code Generation Changes to Support Versioning](wp_schema_versioning.html#schemaversioning-codegen-support)
      * [Base Schema Class is Always the Latest Version of the Family](wp_schema_versioning.html#base-schema-class-is-always-the-latest-version-of-the-family)
      * [Class Per Version with Typedef Mapping to “Current” or “Latest” Version-Class](wp_schema_versioning.html#class-per-version-with-typedef-mapping-to-current-or-latest-version-class)
      * [Single C++ Class That Provides API for ALL Versions of the Schema Family](wp_schema_versioning.html#single-c-class-that-provides-api-for-all-versions-of-the-schema-family)
      * [“Compatible Cluster” Classes with Disambiguating Method Names](wp_schema_versioning.html#compatible-cluster-classes-with-disambiguating-method-names)
  + [Stage Variable Expressions](wp_stage_variables.html)
  + [UsdAudio Proposal](wp_usdaudio.html)
    - [Goal](wp_usdaudio.html#goal)
    - [Initial Requirements](wp_usdaudio.html#initial-requirements)
    - [Proposed Prim Schema](wp_usdaudio.html#proposed-prim-schema)
      * [SpatialAudio](wp_usdaudio.html#spatialaudio)
    - [USD Sample](wp_usdaudio.html#usd-sample)
    - [Other Notes/Questions](wp_usdaudio.html#other-notes-questions)
      * [SdfTimeCode and Time Scaling](wp_usdaudio.html#sdftimecode-and-time-scaling)
  + [UsdShade Material Assignment](wp_usdshade.html)
    - [Background](wp_usdshade.html#background)
    - [Basic Proposal for Collection-Based Assignment](wp_usdshade.html#basic-proposal-for-collection-based-assignment)
      * [Example Collection-Based Assignment](wp_usdshade.html#example-collection-based-assignment)
      * [Refinement 1: Specifying Binding Strength](wp_usdshade.html#refinement-1-specifying-binding-strength)
      * [Refinement 2: Material Purpose](wp_usdshade.html#refinement-2-material-purpose)
      * [Material Resolve: Determining the Bound Material for any Geometry Prim](wp_usdshade.html#material-resolve-determining-the-bound-material-for-any-geometry-prim)
      * [UsdShade API](wp_usdshade.html#usdshade-api)
    - [Analysis of Collection-Based Binding](wp_usdshade.html#analysis-of-collection-based-binding)
    - [Integration](wp_usdshade.html#integration)
      * [Katana Import](wp_usdshade.html#katana-import)
      * [Maya I/O](wp_usdshade.html#maya-i-o)
      * [Houdini](wp_usdshade.html#houdini)
    - [Remaining Questions](wp_usdshade.html#remaining-questions)
      * [Performance](wp_usdshade.html#performance)
      * [Implication on Renderer Instancing](wp_usdshade.html#implication-on-renderer-instancing)
      * [Material Layering](wp_usdshade.html#material-layering)
* [FAQ](usdfaq.html)
  + [General Questions](usdfaq.html#general-questions)
    - [What is USD and why should I use it?](usdfaq.html#what-is-usd-and-why-should-i-use-it)
    - [What programming languages are supported?](usdfaq.html#what-programming-languages-are-supported)
    - [Isn’t USD just another file format?](usdfaq.html#isn-t-usd-just-another-file-format)
    - [So what file formats does USD support?](usdfaq.html#so-what-file-formats-does-usd-support)
    - [What file format is my .usd file?](usdfaq.html#what-file-format-is-my-usd-file)
    - [What character encoding does .usda support?](usdfaq.html#what-character-encoding-does-usda-support)
    - [How can I convert USD files between binary and text?](usdfaq.html#how-can-i-convert-usd-files-between-binary-and-text)
    - [What data types are supported?](usdfaq.html#what-data-types-are-supported)
    - [What does a USD file look like?](usdfaq.html#what-does-a-usd-file-look-like)
  + [Subtler Aspects of Scene Description and Composition](usdfaq.html#subtler-aspects-of-scene-description-and-composition)
    - [I have some layers I want to combine: Should I use SubLayers or References?](usdfaq.html#i-have-some-layers-i-want-to-combine-should-i-use-sublayers-or-references)
    - [What happens to “overs” when their underlying prim is moved to a different location in the scenegraph?](usdfaq.html#what-happens-to-overs-when-their-underlying-prim-is-moved-to-a-different-location-in-the-scenegraph)
    - [When can you delete a reference (or other deletable thing)?](usdfaq.html#when-can-you-delete-a-reference-or-other-deletable-thing)
      * [List-edited string, token, and int metadata](usdfaq.html#list-edited-string-token-and-int-metadata)
      * [List-edited relationships and connections](usdfaq.html#list-edited-relationships-and-connections)
      * [List-edited composition arcs](usdfaq.html#list-edited-composition-arcs)
    - [What’s the difference between an “over” and a “typeless def” ?](usdfaq.html#what-s-the-difference-between-an-over-and-a-typeless-def)
    - [Why Can’t I Instance a Leaf Mesh Prim Directly?](usdfaq.html#why-can-t-i-instance-a-leaf-mesh-prim-directly)
  + [Build and Runtime Issues](usdfaq.html#build-and-runtime-issues)
    - [How do I use the `TF_DEBUG` mechanism?](usdfaq.html#how-do-i-use-the-tf-debug-mechanism)
    - [Why Isn’t Python Finding USD Modules?](usdfaq.html#why-isn-t-python-finding-usd-modules)
    - [Why Isn’t This Plugin Being Built?](usdfaq.html#why-isn-t-this-plugin-being-built)
    - [Why doesn’t the OpenUSD runtime recognize the USD file format?](usdfaq.html#why-doesn-t-the-openusd-runtime-recognize-the-usd-file-format)
    - [Why Isn’t My App Finding USD DLLs and Plugins on Windows?](usdfaq.html#why-isn-t-my-app-finding-usd-dlls-and-plugins-on-windows)
* [Performance Considerations](maxperf.html)
  + [Use an allocator optimized for multithreading](maxperf.html#use-an-allocator-optimized-for-multithreading)
  + [Use binary “.usd” files for geometry and shading caches](maxperf.html#use-binary-usd-files-for-geometry-and-shading-caches)
  + [Package assets with payloads](maxperf.html#package-assets-with-payloads)
  + [What makes a USD scene heavy/expensive?](maxperf.html#what-makes-a-usd-scene-heavy-expensive)
* [Performance Metrics](ref_performance_metrics.html)
  + [What We Measure](ref_performance_metrics.html#what-we-measure)
  + [What Environment Is Used](ref_performance_metrics.html#what-environment-is-used)
    - [Linux](ref_performance_metrics.html#linux)
    - [macOS](ref_performance_metrics.html#macos)
    - [Windows](ref_performance_metrics.html#windows)
    - [USD Build](ref_performance_metrics.html#usd-build)
  + [Metrics](ref_performance_metrics.html#metrics)
    - [Performance Graphs Per Platform](ref_performance_metrics.html#performance-graphs-per-platform)
    - [Standard Shader Ball](ref_performance_metrics.html#standard-shader-ball)
    - [Kitchen Set](ref_performance_metrics.html#kitchen-set)
    - [ALab](ref_performance_metrics.html#alab)
    - [Moore Lane](ref_performance_metrics.html#moore-lane)
  + [Running Performance Metrics Locally](ref_performance_metrics.html#running-performance-metrics-locally)
    - [Adding Custom Metrics](ref_performance_metrics.html#adding-custom-metrics)
* [Third Party Plugins](plugins.html)
  + [RenderMan USD Imaging Plugin](plugins_renderman.html)
    - [Configuration](plugins_renderman.html#configuration)
      * [Building hdPrman](plugins_renderman.html#building-hdprman)
      * [Running hdPrman](plugins_renderman.html#running-hdprman)
    - [Developer](plugins_renderman.html#developer)
      * [Supported Render Pass AOVs](plugins_renderman.html#supported-render-pass-aovs)
  + [Alembic USD Plugin](plugins_alembic.html)
    - [Known Limitations](plugins_alembic.html#known-limitations)

Collaborate

* [Source Code @ GitHub](https://github.com/PixarAnimationStudios/OpenUSD)
* [OpenUSD Forum](https://forum.openusd.org)
* [Contributing](contributing_to_usd.html)
  + [Contributor License Agreement](contributing_to_usd.html#contributor-license-agreement)
  + [Coding Conventions](contributing_to_usd.html#coding-conventions)
  + [Pull Request Guidelines](contributing_to_usd.html#pull-request-guidelines)
  + [Git Workflow](contributing_to_usd.html#git-workflow)
    - [GitHub Issues](contributing_to_usd.html#github-issues)
  + [Making Major Changes](contributing_to_usd.html#making-major-changes)
    - [Step 1. Get consensus for major changes](contributing_to_usd.html#step-1-get-consensus-for-major-changes)
    - [Step 2. Make code changes](contributing_to_usd.html#step-2-make-code-changes)
    - [Step 3. Test code changes](contributing_to_usd.html#step-3-test-code-changes)
    - [Step 4. Submit code for review](contributing_to_usd.html#step-4-submit-code-for-review)
    - [Step 5. Pixar will test and land your changes](contributing_to_usd.html#step-5-pixar-will-test-and-land-your-changes)
* [Contributors](contributors.html)
* [Release Schedule](release_schedule.html)

Press

* [Open Source Release](press_opensource_release.html)
* [Open Source Announcement](press_opensource_announce.html)

[Universal Scene Description](index.html)

* Introduction to USD

---

# Introduction to USD[](#introduction-to-usd "Link to this heading")

* [What is USD?](#what-is-usd)
* [Why use USD?](#why-use-usd)
* [What can USD do?](#what-can-usd-do)

  + [USD can represent:](#usd-can-represent)
  + [USD can compose and override:](#usd-can-compose-and-override)
  + [USD/Hydra can image:](#usd-hydra-can-image)
  + [USD can be extended/customized:](#usd-can-be-extended-customized)
* [What can’t USD do?](#what-can-t-usd-do)

  + [No GUIDS](#no-guids)
  + [Not a rigging system](#not-a-rigging-system)
* [Heritage of USD at Pixar](#heritage-of-usd-at-pixar)

## [What is USD?](#id3)[](#what-is-usd "Link to this heading")

Pipelines capable of producing computer graphics films and games typically
generate, store, and transmit large quantities of 3D data, which we call
“scene description”. Each of many cooperating applications in the pipeline
(modeling, shading, animation, lighting, fx, rendering) typically has its own
special form of scene description tailored to the specific needs and
workflows of the application, which is neither readable nor editable by any
other application. **Universal Scene Description (USD) is the first publicly
available software that addresses the need to robustly and scalably
interchange and augment arbitrary 3D scenes that may be** composed
**from many elemental assets.**

USD provides for interchange of elemental assets (e.g. models) or
animations. But unlike other interchange packages, USD also enables assembly
and organization of any number of assets into virtual sets, scenes, shots,
and worlds, transmitting them from application to application, and
non-destructively editing them (as *overrides*), with a single, consistent
API, in a single scenegraph. USD provides a [rich toolset](toolset.html) for
reading, writing, editing, and rapidly previewing 3D geometry, shading,
lighting, physics, and a growing number of other graphics-related domains.
In addition, because USD’s core scenegraph and [composition engine](glossary.html#composition) are agnostic of any particular domain, USD can be
extended in a maintainable way to encode and compose data in other domains.

Concretely, USD is an [open source project](https://github.com/PixarAnimationStudios/OpenUSD) released under the
[TOST license](https://openusd.org/license).

See also

[USD Basics in an Hour(ish)](https://openusd.org/files/USD_Quickstart_Guide.pdf)
for a quick intro to USD.

## [Why use USD?](#id4)[](#why-use-usd "Link to this heading")

USD is the core of Pixar’s 3D graphics pipeline, used in every 3D authoring and
rendering application, including Pixar’s proprietary *Presto* animation
system. Pixar is deeply committed to evolving and improving USD to address the
following ongoing production concerns:

> * **Provide a rich, common language for defining, packaging, assembling, and
>   editing 3D data, facilitating the use of multiple digital content creation
>   applications.**
>
>   Like many other interchange packages, USD provides a low-level data
>   model that stipulates, at a “file format level”, how data is encoded
>   and organized, plus a (extensible) set of high-level schemas that
>   provide meaningful API’s and organization for concepts like [a
>   mesh](./api/class_usd_geom_mesh.html) or [a transform](./api/class_usd_geom_xformable.html).
>   With such a foundation one can create asset definitions with
>   geometric, material, lighting, and other properties. But USD goes
>   further to provide a freely combinable set of [Composition Arcs](glossary.html#usdglossary-compositionarcs) that can be used to package, aggregate, vary, and override
>   primitive elements and assets, with a high-performance runtime
>   evaluation engine, embodied in a compact scenegraph known as a
>   [Stage](glossary.html#usdglossary-stage), for resolving the resulting [composed
>   scene description](glossary.html#composition) and extracting (and
>   authoring) data from it.
> * **Allow multiple artists to collaborate on the same assets and scenes.**
>
>   USD’s most basic composition arc, [the subLayers operator](glossary.html#usdglossary-sublayers), facilitates multiple artists in different
>   departments, or within the same department, to simultaneously work on
>   the same asset or scene, by allowing each artist to work in their own
>   file (called a [Layer](glossary.html#usdglossary-layer)), all of which will be combined
>   and resolved in a [strength ordering](glossary.html#usdglossary-livrpsstrengthordering)
>   clearly specified in the USD files themselves. This ability
>   is not a magic bullet that can automatically adjust shading data in a
>   stronger layer when the modeling artist changes the topology of
>   geometry defined in a weaker layer, but it allows each artist to work
>   independently without erasing or editing any other artist’s work, and
>   helps to provide a clear audit trail of changes that aids in addressing
>   problems like the changing-topology problem.
> * **Maximize artistic iteration by minimizing latency.**
>
>   As in many media, one of the most important ingredients to achieving
>   high-quality digital art is the ability to iterate quickly and often on a
>   design, an asset, an animation. One of the most prominent impediments to
>   iteration in 3D art is the speed with which an artist can get “good
>   enough” visual feedback on the results of their edits, and the speed with
>   which they can migrate new data between multiple applications, or restore
>   a session that has crashed. Speed is a primary, ongoing goal of the USD
>   project at Pixar; we continue to explore algorithmic improvements, better
>   ways to leverage modern multi-core systems and GPU’s, and compression
>   techniques to minimize latency in accessing remotely stored data.

If your needs are similar to or are a subset of the above, then USD may be an
attractive choice.

## [What can USD do?](#id5)[](#what-can-usd-do "Link to this heading")

### [USD can represent:](#id6)[](#usd-can-represent "Link to this heading")

USD organizes data into hierarchical namespaces of [Prims](glossary.html#usdglossary-prim) (short for “primitive”). In addition to child prims, each
prim can contain [Attributes](glossary.html#attribute) and
[Relationships](glossary.html#usdglossary-relationship), collectively known as
[Properties](glossary.html#usdglossary-property). Attributes have [typed values](api/_usd__page__datatypes.html) that
can vary over time; Relationships are multi-target “pointers” to other
objects in a hierarchy, and USD takes care of remapping the targets
automatically when referencing causes namespaces to change. Both prims and
properties can also have (non-time-varying) metadata. Prims and their
contents are organized into a file abstraction known as a
[Layer](glossary.html#usdglossary-layer).

Built on top of this low-level, generic scene description, USD provides a set of
schemas that establish a standard encoding and client API for common 3D computer
graphics concepts like:

Geometry
:   The [UsdGeom schemas](api/usd_geom_page_front.html)
    define [OpenSubdiv](https://graphics.pixar.com/opensubdiv/docs/intro.html)
    -compliant meshes, transforms, curves, points, nurbs patches, and
    several intrinsic solids. It also defines: the concept of arbitrary
    [primvars](glossary.html#usdglossary-primvar) as attributes that can interpolate
    across a geometric surface; geometric extents and aggregate, computed
    bounding boxes; [pruning visibility](glossary.html#usdglossary-visibility); and
    an attribute called [Purpose](glossary.html#usdglossary-purpose) that expresses a
    (non-animatable) conditional visibility useful for deploying
    level-of-detail proxies and guides.

Shading
:   The [UsdShade schemas](api/usd_shade_page_front.html)
    define primitive shader nodes that can be connected into networks and
    packaged into reusable materials, on which one can create a public
    interface of attributes that will drive parameters in the contained
    shader networks. UsdShade also provides flexible mechanisms for
    *binding* geometry to materials so as to define their lighting response
    (and physics) characteristics.

Model and Asset
:   USD’s composition operators allow you to construct arbitrarily large,
    complex scenes. As an aid to processing, analyzing, and decomposing
    such scenes, USD formalizes the concepts of [Model](glossary.html#usdglossary-model) and
    [Asset](glossary.html#asset). The “model” prim classification allows
    scenegraphs to be partitioned into logical, manageable chunks for
    traversal, working-set management, and data coalescing/caching. The
    concept of “asset” shows up in USD at two levels: as a core datatype
    for referring unambiguously to an external file, identifying which data
    needs to participate in [asset/path resolution](glossary.html#usdglossary-assetresolution); and in the [AssetInfo](glossary.html#usdglossary-assetinfo) schema for
    depositing a record of what assets have been referenced into a scene,
    which survives even if the scene is [flattened](glossary.html#flatten).

### [USD can compose and override:](#id7)[](#usd-can-compose-and-override "Link to this heading")

The following is a very compact description of USD’s composition semantics, with
links to more detailed descriptions.

You can “stack” USD layers together using the [subLayers composition arc](glossary.html#usdglossary-sublayers), and the composition engine will resolve the data
contained in such ordered (nestable) [“LayerStacks”](glossary.html#usdglossary-layerstack) similarly to how layers in Photoshop are composed.

Any prim in a layer can also contain one or more [references composition
arcs](glossary.html#usdglossary-references) that target a prim in another (or the same!)
layer, and composes the tree rooted at the target prim into the referencing
prim - this is the primary way to assemble elemental assets into aggregates
and complete scenes. The [payload arc](glossary.html#usdglossary-payload) provides a
“deferred reference” that can be selectively “loaded” (or unloaded) from a
[Stage](glossary.html#usdglossary-stage) *after* the stage was initially opened; judicious use
of payloads allows you to structure scenes so that clients can easily manage
“working sets”, keeping in memory just the parts of the scene they need for
the task at hand.

[VariantSets](glossary.html#usdglossary-variantset) allow an asset *creator* to bundle
different multiple variations of an asset all into a single package with a
“variant selector” that downstream asset *consumers* can switch,
non-destructively, in stronger layers to change the variation they desire;
any prim can define multiple VariantSets, which can vary along dependent or
independent axes.

The last two composition arcs, [inherits](glossary.html#usdglossary-inherits)
and [specializes](glossary.html#usdglossary-specializes) both
establish a persistent (across further, upstream composition arcs) relationship
between a “base” prim and a “derived” prim, such that the derived prim receives
all of the overrides applied to the base prim anywhere in the composition; the
technical difference between inherits and specializes lies in
the particulars of when derived’s opinions “win out” over base’s opinions, but
practically the difference is: you can use inherits to easily “mass
edit” all instances of a particular class of prim or asset, and you can use
specializes to create a “derived” that is always a “specialized”
refinement of “base” in all views of your scene.

The most powerful and unifying aspect of USD’s composition semantics is that all
of the above operators can be applied to any prim, in any combination, and the
composition engine will [resolve the resulting graph in a predictable way](glossary.html#usdglossary-livrpsstrengthordering). The other desirable
property that falls out of this uniform treatment of composition arcs is that
stronger layers in a composition can override the scene description in weaker
layers *uniformly*, regardless of whether the weaker layers were subLayered,
referenced, inherited, etc. A stronger layer can override the following with
respect to weaker layers:

> * **Add new prims** including entire subtrees rooted at the added prim
> * [Deactivate](glossary.html#active-inactive) prims , which is
>   USD’s method for non-destructive (and reversible) prim/subtree deletion
> * **Reorder prims**, since in some contexts, the namespace-ordering can be
>   meaningful
> * **Add or remove** [Variants](glossary.html#usdglossary-variant) to an existing
>   VariantSet
> * **Add or remove entire VariantSets**, or targets to inherit or specialize
> * **Override the value of schema and user-level metadata** on a prim or
>   property
> * **Add new properties** to a prim
> * **Reorder properties** on a prim. If not explicitly ordered, properties
>   are enumerated in dictionary order
> * **Override the value of any attribute** (an override value blocks all
>   weaker timeSamples/splines)
> * [Block the value](glossary.html#attribute-block) of an
>   attribute, so that it will appear to have no authored value (or no
>   authored animated value, if using an
>   [animation block](glossary.html#usdglossary-animationblock))
> * **Add, remove, and reorder targets on a relationship or attribute
>   connection**

Finally, USD provides a handful of scenegraph-level features that can greatly
expand the types and scale of datasets encodable in USD. The two most
prominent are [native prim Instancing](glossary.html#usdglossary-instancing) for very
compactly encoding (and processing) large numbers of instances/copies of a
referenced asset or prim, applicable when the copies do not need to be deeply
edited; and [Value Clips](glossary.html#usdglossary-valueclips), which allow timeSamples for
a set of prims to be distributed across many files, and (re-)sequenced and
retimed non-destructively.

### [USD/Hydra can image:](#id8)[](#usd-hydra-can-image "Link to this heading")

[Hydra](glossary.html#hydra) is the imaging framework that ships as part of the USD
distribution. It connects “scene delegates” (that consume scene data) and
“render delegates” (that send the scene data to particular renderers), in such
a way that render and scene delegates can be mixed and matched as
applications and consumers’ needs dictate. Hydra’s first and primary render
delegate is the rasterizing **Storm** renderer, which began as a modern
OpenGL renderer, and which has now incorporated a “graphics interface”
abstraction that allows Storm to use Vulkan, Metal, and potentially other
rasterizing rendering API’s. Storm is highly scalable, multi-pass, and uses
[OpenSubdiv](https://graphics.pixar.com/opensubdiv/docs/intro.html) for
mesh rendering. The repository also includes with a simple [Embree](https://embree.github.io/) -based path tracer to serve as an example for
creating more backends, and HdPrman, which is evolving into the definitive
means of rendering USD with [Pixar’s premiere RenderMan renderer](https://renderman.pixar.com).

The USD scene delegate to Hydra is used in [usdview](toolset.html#usdview) and nearly
all third-party plugins that integrate USD, and is meant to provide a “ground
truth” rendering of any scene composed of prims conforming to the [UsdGeom
schemas](api/usd_geom_page_front.html),
UsdShade, UsdVol, UsdSkel, UsdLux, and other graphics-related schema
domains. It also provides fast preview and animation streaming for USD
scenes.

### [USD can be extended/customized:](#id9)[](#usd-can-be-extended-customized "Link to this heading")

Even though USD is primarily used as an embedded sub-system, the breadth of
the problem-space it covers demands that it be extensible along a number of
axes. USD comes with its own [plugin discovery mechanism](api/plug_page_front.html), and the
following plugin-points:

> * **Asset Resolution**
>
>   In a highly-referenced scene, it can be advantageous to have a degree
>   of separation between the asset paths recorded in the USD files and the
>   “resolved locator/identifier” from which the asset will ultimately be
>   loaded. The [ArResolver](./api/class_ar_resolver.html) interface can be customized per USD
>   installation and per “plugin package”, allowing, for example,
>   site-specific naming conventions to be resolved, and for dynamic
>   versioning control to be applied. USD ships with a default resolver
>   implementation that allows for simple “search-path” style asset resolution
>   for traditional filesystems.
>
>   However, the Ar system allows for the coexistence of multiple,
>   URI-protocol-dispatched resolvers, each of which can resolve asset
>   paths to [ArAsset](./api/class_ar_asset.html) that can stream data directly from clouds or
>   databases, or even construct assets procedurally, in-memory.
> * **File Formats**
>
>   A USD Layer can be taught to be populated with data translated from any
>   kind of compatible file format, by implementing an [SdfFileFormat](./api/class_sdf_file_format.html)
>   plugin for the format. USD’s own native *usda* (text), *usdc* (binary),
>   and *usdz* (packaged archive) formats are implemented this way, as is the
>   included support for reading Alembic files via the [Alembic USD
>   Plugin](plugins_alembic.html), as well as [MaterialX xml files](api/usd_mtlx_page_front.html).
>
>   File formats can also be “dynamic”, such that when referenced into a
>   scene via a [payload arc](glossary.html#usdglossary-payload), modifiable metadata
>   parameters on the payloaded prim are transmitted to the file format
>   plugin which is then allowed to re-evaluate itself. This allows for a
>   degree of user-directed proceduralism.
> * **Schemas**
>
>   USD includes [a tool for generating new schemas](tut_generating_new_schema.html) (C++ classes, python bindings, and all
>   required boilerplate) from a simple usda text description of the
>   schema. This can be used to add new USD prim schema types and API’s to
>   your pipeline or package, with which you will be able to interact in your
>   application-level plugins just as if they were native USD schemas. For
>   typed schemas that are conceptually imageable, you can also teach Hydra
>   how to image them. You can additionally use
>   [OpenExec](intro_to_openexec.html#intro-to-openexec) to register computations for schemas
>   for better performance characteristics in addition to data invalidation
>   and caching management.

## [What can’t USD do?](#id10)[](#what-can-t-usd-do "Link to this heading")

### [No GUIDS](#id11)[](#no-guids "Link to this heading")

USD uses a textual, hierarchical namespace to identify its data, which means it
is “namespace paths” by which overrides bind to their defining
prims/properties. In consequence, when the internal namespace of a referenced
asset changes, *higher-level overrides previously recorded in referencing assets
will fall off*. One solution to this problem is to identify data by a
“globally unique identifer” (GUID), and then associate overrides with the same
GUID as the defining prim. While solving the namespace-editing problem, GUIDs
introduce other problems into a pipeline, and potentially limitations on
flexibility of composition. In past iterations of USD, Pixar used a form of
GUID at the model/asset granularity, and after carefully weighing the pros and
cons, we have decided that for us, the cost of occasional “namespace fix-up”
operations run over a collection of assets is worth paying for the ease of asset
construction and aggregation, and readable text asset representations that we
get from namespace-paths as identifiers.

### [Not a rigging system](#id12)[](#not-a-rigging-system "Link to this heading")

USD provides a lightweight, optimized scenegraph to facilitate authoring and
efficient extraction of composed scene description. However, USD’s scenegraph
leans towards a “low-memory footprint, higher-latency data access” tradeoff,
whereas a high-performance rigging system requires more of a “high-memory
footprint, low-latency access to data” tradeoff.

The [OpenExec](intro_to_openexec.html#intro-to-openexec) computation engine does provide a
general purpose computation framework that could be used to develop a rigging
system, but OpenExec by itself is not a rigging system. See
[What OpenExec Is Not](intro_to_openexec.html#openexec-is-not) for more details.

Further, the more rigging behaviors and execution semantics we would add to USD,
the more difficult it would become to interchange the data successfully between
DCC’s, since there is not, currently, broad agreement between vendors of what
these behaviors should be.

USD and its schema generation tools should be suitable for encoding rigging for
round-tripping rigging data in a particular application or custom pipeline, and
USD does provide facilities that a client could use to build more extensive
in-memory caches on top of a UsdStage to provide lower-latency access to data
encoded in USD. But for now, these do not play a significant role in what we
feel is the primary directive of USD: scalable interchange of geometric,
shading, and lighting data between DCC’s in a 3D content creation pipeline.

## [Heritage of USD at Pixar](#id13)[](#heritage-of-usd-at-pixar "Link to this heading")

USD is roughly the fourth generation of “composed scene description” developed
at Pixar. After muscling through [Toy Story](https://www.pixar.com/feature-films/toy-story), in which each shot was
described by a single, linear program file, the Pixar R&D team began adding and
evolving concepts for referencing, layering, editing, and variation in the
context of its proprietary animation system, *Marionette* (known internally as
Menv), beginning with [A Bug’s Life](https://www.pixar.com/feature-films/a-bugs-life), and continuing over the
course of the next ten feature films.

By 2004 it was clear that, although Marionette had grown quite powerful, its
organically evolved provenance was becoming a hindrance to continued stable
development and our ability to leverage important tools like multi-core
systems. The studio committed to the design and development of a ground-up,
second-generation animation system now known as *Presto*, which was first used
on [Brave](https://www.pixar.com/feature-films/brave) and all features
since. One of the problems with Marionette that Presto set out to address was
that its various features for composing and overriding 3D scene description
could not always be used together effectively, because they were spread across
three different formats and “composition engines”. Presto delivered a second
generation of scene description that was *unified*, enabling referencing,
overriding, variation, and other operations at all granularities from a single
mesh, to an entire model, to an environment or shot, encoded in a single text
format and evaluated with a single composition engine.

However, at the same time, Pixar, along with much of the film and effects
industry, found it advantageous to transition from a pipeline in which animation
and rigging were kept live up until rendering, to one in which animation and
rigs were baked out into efficient “pose caches” containing animated posed
points and transforms, so that lighting, effects, and rendering could reduce the
latency (and memory footprint) with which they can access the
data. Consequently, in 2008-2009, the pipeline development team began building
*TidScene*, a geometry schema backed by a binary database (Berkeley DB), with a
lightweight scenegraph as the mechanism for authoring and reading time-sampled
data. Key elements of TidScene included a (for the time) high performance
OpenGL rendering plugin that enabled direct-from-TidScene preview rendering in
all pipeline applications, and the development of a native referencing feature
that was used (possibly abused) to achieve layering, scenegraph “isolation”
(i.e. loading only a portion of the scene), asset referencing, and some support
for variation.

The speed, scalability, and universal pipeline access of TidScene pose-caches
were a success, but also put Pixar back into a place where we had multiple,
competing systems for creating composed scene description, with different
semantics, API’s, and places in the pipeline where they could be used. The
mandate for the USD project, initiated in 2012, was to marry the (recently
redesigned and improved) composition engine and low-level data model from Presto
with the lazy-access, time-sampled data model and lightweight scenegraph from
TidScene. USD delivers an all-new scenegraph that sits on top of the very same
composition engine that Presto uses, and has introduced parallel computation
into all levels of the scene description and composition core.

A key component of the USD project was the development of a modern, scalable
rendering architecture, dubbed *Hydra*, initially deployed with what would
become known as the Storm high-performance rasterizing renderer. Hydra ships
as part of the USD project because it adds tremendous value to USD adoption
in a pipeline and is used in all our plugins; it also provides a benchmark
and reference for how to leverage USD’s multithreading for fast scene loading
and imaging, as well as updating efficiently in response to dynamic edits to
a live UsdStage. However, Hydra is a product in its own right, and already
has other direct front-end couplings other than USD (including Presto and
Maya, Katana, and Houdini plugins), and has grown beyond its original
OpenGL-inspired architecture to service other render delegates, such as
path-tracers.

[Previous](index.html "USD Home")
[Next](intro_to_openexec.html "Introduction to OpenExec")

---

© Copyright 2021, Pixar Animation Studios.

[Terms of Use](https://disneytermsofuse.com/)
