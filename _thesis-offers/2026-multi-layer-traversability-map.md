---
title:  "Traversability-Aware World Model for Autonomous Off-Road Mobile Robots"
subtitle: 
thumbnail: ""

tags: [biobots, navigation]
categories: [thesis offer]

---
In this thesis, you will create a multi-layer traversability map for an autonomous off-road mobile robot. You will use an RGB-D camera to build a robot-centric map with derived geometric features, including slope, step height, holes, roughness, etc. The map should be generic so that it can be used with multiple robots; also, the robot size and capabilities will be parametrized. You will use datasets for outdoor environments, including roadside, grasslands, and forest edges. 

<b>The tasks include:</b>
<ul>
    <li>Generate 2.5D elevation maps.</li>
    <li>Derive Traversability Features (Geometry Layer), i.e., slope, step height, holes, roughness, etc.</li>
    <li>Create a Semantic Layer (from RGB) to distinguish between grass, dirt, asphalt, rock, vegetation, obstacle, etc. </li>
    <li>Define a robot-aware traversability scoring, considering the volume of the robot and its capabilities, to create a cost map for path planning.</li>
</ul>

<b>Related Work:</b>
<ul>
    <li>https://nav2.org/</li>
    <li>https://github.com/ANYbotics/grid_map</li>
</ul>

