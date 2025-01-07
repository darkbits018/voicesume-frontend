to run clone this repo 

then install packages using 
```
npm install
```

# commands
- dev
  ```
  npm run dev
  ```
- build
  ```
  npm run build
  ```

  # Project Structure

## **Root Files**
- **`.gitignore`**: Specifies files and directories to be ignored by Git.
- **`eslint.config.js`**: Configuration for ESLint, a tool for identifying and fixing linting issues in JavaScript and TypeScript code.
- **`index.html`**: The main HTML file that serves as the entry point for the React application.
- **`package.json`**: Contains metadata about the project, including dependencies, scripts, and other configurations.
- **`postcss.config.js`**: Configuration for PostCSS, a tool for transforming CSS with JavaScript plugins.
- **`tailwind.config.js`**: Configuration for Tailwind CSS, a utility-first CSS framework.
- **`tsconfig.app.json`**: TypeScript configuration specific to the application.
- **`tsconfig.json`**: Base TypeScript configuration file.
- **`tsconfig.node.json`**: TypeScript configuration specific to Node.js.
- **`vite.config.ts`**: Configuration for Vite, a build tool that provides a fast development server and optimized build process.

---

## **`src` Directory**

### **Files**
- **`App.tsx`**: The main React component that sets up the application structure and manages the workflow.
- **`index.css`**: Global CSS file that includes Tailwind CSS styles.
- **`main.tsx`**: Entry point for the React application, rendering the `App` component into the DOM.

---

### **`components` Directory**
- **`ChatActions.tsx`**: Component for rendering chat action buttons or input fields.
- **`ChatInput.tsx`**: Component for rendering the chat input field with voice input support.
- **`ChatMessage.tsx`**: Component for rendering individual chat messages.
- **`StageManager.tsx`**: Component for managing different stages of the workflow.

---

### **`hooks` Directory**
- **`useVoiceInput.ts`**: Custom hook for managing voice input functionality.
- **`useWorkflow.ts`**: Custom hook for managing the workflow state and transitions.

---

### **`services` Directory**
- **`api.ts`**: Contains functions for interacting with the backend API.

---

### **`stages` Directory**
- **`CareerObjectiveStage.tsx`**: Component for the career objective stage of the workflow.
- **`ExperienceLevelStage.tsx`**: Component for the experience level stage of the workflow.
- **`UserInfoStage.tsx`**: Component for the user information stage of the workflow.
- **`index.ts`**: Exports all stage components.

---

### **`types` Directory**
- **`chat.ts`**: Type definitions for chat-related data structures.
- **`index.ts`**: Exports all type definitions.
- **`message.ts`**: Type definitions for message-related data structures.
- **`workflow.ts`**: Type definitions for workflow-related data structures.

---

### **`utils` Directory**
- **`messageUtils.ts`**: Utility functions for creating and managing messages.
- **`workflowMessages.ts`**: Utility functions for generating messages based on workflow stages.
- **`workflowUtils.ts`**: Utility functions for managing workflow transitions.

---

### **Other Files**
- **`vite-env.d.ts`**: TypeScript declaration file for Vite-specific types.
