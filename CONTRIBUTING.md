# Contributing Guide

Thank you for your interest in contributing to UI Library Explorer! This guide will help you get started.

## 🚀 Getting Started

### Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/ui-library-explorer.git
cd ui-library-explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Run linting**
```bash
npm run lint
```

## 📝 How to Contribute

### Adding New Libraries

To add a new UI library to the database:

1. **Edit the data file**: `src/data/libraries.ts`
2. **Add library object** with required fields:
```typescript
{
  id: unique_number,
  name: "Library Name",
  description: "Brief description",
  img: "logo_url",
  website: "website_url",
  github: "github_url",
  category: "Category",
  stars: number,
  downloads: number,
  lastUpdated: "YYYY-MM-DD",
  tags: ["tag1", "tag2"],
  // Feature flags
  isFullyAccessible: boolean,
  hasBuiltinThemes: boolean,
  hasDarkMode: boolean,
  hasFigmaFiles: boolean,
  isFullyTyped: boolean,
  isTailwind: boolean,
  hasComponents: boolean,
  isFree: boolean,
  isSponsor: boolean
}
```

### Code Contributions

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
   - Follow existing code style
   - Add TypeScript types
   - Use Tailwind CSS for styling
   - Ensure accessibility

3. **Test your changes**
   - Test on different screen sizes
   - Verify dark mode compatibility
   - Check accessibility with screen readers

4. **Commit your changes**
```bash
git commit -m "feat: add new feature description"
```

5. **Push and create PR**
```bash
git push origin feature/your-feature-name
```

## 🎨 Code Style

### TypeScript
- Use strict TypeScript
- Define interfaces for all props
- Avoid `any` types

### React Components
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and small

### Styling
- Use Tailwind CSS classes
- Follow responsive-first approach
- Maintain dark mode compatibility
- Use semantic HTML elements

### File Organization
```
components/
├── shared/          # Feature components
│   ├── Header.tsx
│   └── LibraryCard.tsx
└── ui/              # Base components
    ├── Button.tsx
    └── Card.tsx
```

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, screen size
- **Screenshots**: If applicable

## 💡 Feature Requests

For new features:

- **Use case**: Why is this needed?
- **Description**: What should it do?
- **Mockups**: Visual examples if helpful
- **Implementation ideas**: Technical approach

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project style
- [ ] TypeScript types are correct
- [ ] Components are responsive
- [ ] Dark mode works properly
- [ ] Accessibility is maintained
- [ ] No console errors

### PR Description
- Clear title describing the change
- Link to related issues
- Screenshots for UI changes
- Breaking changes noted

## 🔍 Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on different devices
4. **Merge** after approval

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Follow the code of conduct
- Ask questions if unsure

## 📞 Getting Help

- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub discussions
- **Questions**: Tag maintainers in issues

Thank you for contributing! 🎉