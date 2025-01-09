# Generative Art Tool

## Overview

The Generative Art Tool is an interactive web application that allows users to create and customize generative art in real-time. Built with Next.js and React, this tool provides a dynamic canvas where particles move and interact based on user-defined settings, creating mesmerizing visual patterns.

## Features

- Real-time generative art creation
- Customizable settings:
  - Shape (Waves, Spiral, Vortex)
  - Complexity (number of particles)
  - Speed
  - Particle size
  - Trail length
  - Color
- AI collaboration mode (simulated)
- Responsive design

## Project Structure

The project is organized as follows:

\`\`\`
app/
├── components/
│   ├── controls/
│   │   ├── ColorPicker.tsx
│   │   ├── ShapeSelector.tsx
│   │   └── Slider.tsx
│   ├── ArtGenCanvas.tsx
│   └── ControlPanel.tsx
├── lib/
│   └── artgen/
│       └── index.ts
├── types/
│   └── index.ts
├── globals.css
├── layout.tsx
└── page.tsx
\`\`\`

- \`components/\`: Contains React components used in the application
- \`lib/artgen/\`: Houses the core logic for generating the artwork
- \`types/\`: Defines TypeScript types used throughout the project
- \`page.tsx\`: The main page component that brings everything together

## Setup and Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/generative-art-tool.git
   cd generative-art-tool
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Open \`http://localhost:3000\` in your browser to see the application.

## Usage

1. Use the control panel on the left to adjust the artwork settings:
   - Select a shape (Waves, Spiral, or Vortex)
   - Adjust complexity, speed, particle size, and trail length using the sliders
   - Choose a color using the color picker

2. Click the "Apply Changes" button to update the artwork with your new settings.

3. Toggle the "AI Collaboration" switch to receive AI-generated suggestions for improving your artwork (Note: This feature is currently simulated).

4. Experiment with different combinations of settings to create unique and interesting patterns!

## How It Works

1. The main \`page.tsx\` component manages the overall state of the application and renders the \`ControlPanel\` and \`ArtGenCanvas\` components.

2. The \`ControlPanel\` component allows users to adjust various settings that affect the artwork's appearance and behavior.

3. The \`ArtGenCanvas\` component creates a canvas element and uses the \`createArtwork\` function from \`lib/artgen/index.ts\` to generate and animate the artwork based on the current settings.

4. The art generation logic in \`lib/artgen/index.ts\` creates and updates particles based on the selected shape and other parameters, resulting in the dynamic visual patterns seen on the canvas.

5. When the user clicks "Apply Changes", the new settings are passed to the \`ArtGenCanvas\` component, which reinitializes the artwork with the updated parameters.

## Customization and Extension

To add new shapes or effects:

1. Modify the \`update\` function in \`lib/artgen/index.ts\` to include new movement patterns.
2. Add new options to the shape selector in \`components/controls/ShapeSelector.tsx\`.
3. Update the \`Settings\` type in \`types/index.ts\` if new parameters are required.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
\`\`\`

This README provides a comprehensive overview of the Generative Art Tool, including its features, project structure, setup instructions, and usage guidelines. It also explains how the tool works and provides information on how to customize and extend the project.

