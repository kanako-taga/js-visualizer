# JavaScript Learning Companion

A modern web application that helps JavaScript beginners understand how their code works at multiple levels - from computer internals to real-world examples. The app provides AI-powered explanations in a friendly, approachable interface designed for users without computer science backgrounds.

![JavaScript Learning Companion](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Vite](https://img.shields.io/badge/Vite-7.0-green)

## 🌟 Features

### Core Functionality
- **Modern Code Editor**: Monaco Editor (VS Code's editor) with JavaScript syntax highlighting
- **AI-Powered Analysis**: OpenAI integration for intelligent code explanations
- **Three-Tab Interface**: 
  - **"How It Works Inside"**: Memory operations, call stack, execution flow
  - **"Syntax Explained"**: Line-by-line breakdown, grammar explanations
  - **"Real Examples"**: Real-world usage patterns and examples
- **Example Code Snippets**: Pre-built examples for variables, functions, loops, and more
- **Local Storage**: Saves user preferences and code history

### Design & UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, friendly interface with smooth animations
- **Accessibility**: Built-in accessibility features and keyboard navigation
- **Loading States**: Proper feedback during API calls
- **Error Handling**: Graceful error handling with helpful messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI-powered explanations)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd js-visualizer-app-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Monaco Editor** - VS Code's editor for code input
- **Lucide React** - Modern icon library

### Styling
- **Custom CSS** - Utility classes and modern styling
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Custom Properties** - Consistent theming

### AI Integration
- **OpenAI API** - GPT-powered code analysis and explanations
- **Structured Prompts** - Consistent, beginner-friendly responses

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeEditor/
│   │   ├── MonacoEditor.tsx      # Main code editor component
│   │   └── ExampleSnippets.tsx   # Pre-built code examples
│   ├── TabSystem/
│   │   ├── TabContainer.tsx      # Main tab interface
│   │   ├── MemoryTab.tsx         # Memory/execution explanations
│   │   ├── SyntaxTab.tsx         # Syntax breakdown
│   │   └── ExamplesTab.tsx       # Real-world examples
│   └── UI/
│       ├── Button.tsx            # Reusable button component
│       ├── Card.tsx              # Card layout component
│       └── LoadingSpinner.tsx    # Loading indicator
├── hooks/
│   ├── useCodeAnalysis.ts        # OpenAI API integration
│   └── useLocalStorage.ts        # Local storage management
├── services/
│   └── openai.ts                 # OpenAI service configuration
├── types/
│   └── index.ts                  # TypeScript type definitions
├── data/
│   └── examples.ts               # Example code snippets
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles and utilities
```

## 🔧 Configuration

### Environment Variables
- `VITE_OPENAI_API_KEY` - Your OpenAI API key for AI-powered explanations

### OpenAI Setup
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to your `.env` file
3. The app will automatically enable AI features when the key is detected

## 🎯 Usage

1. **Write or paste JavaScript code** in the Monaco editor
2. **Click "Analyze Code"** to get AI-powered explanations
3. **Explore the three tabs**:
   - **Memory Tab**: Understand how your code executes in memory
   - **Syntax Tab**: Get line-by-line explanations
   - **Examples Tab**: See real-world usage patterns
4. **Try example snippets** to learn different JavaScript concepts

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Development Features
- **Hot Module Replacement** - Instant updates during development
- **TypeScript Support** - Full type checking and IntelliSense
- **ESLint Configuration** - Code quality and consistency

## 🎨 Customization

### Styling
The app uses custom CSS utility classes. You can modify `src/index.css` to customize:
- Color scheme
- Typography
- Spacing and layout
- Component styles

### AI Prompts
Modify `src/services/openai.ts` to customize:
- Analysis prompt structure
- Response format
- Explanation style

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel** - Automatic deployments from Git
- **Netlify** - Drag-and-drop or Git integration
- **GitHub Pages** - Free hosting for public repositories
- **Any static hosting** - Upload the `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** - For providing the AI capabilities
- **Monaco Editor** - For the excellent code editor
- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool

## 📞 Support

If you have questions or need help:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Made with ❤️ for JavaScript learners everywhere**
# js-visualizer
