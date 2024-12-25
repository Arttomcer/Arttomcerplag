import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposableSnake = vscode.commands.registerCommand('extension.convertToSnakeCase', () => {
        convertCase('snake');
    });

    let disposableCamel = vscode.commands.registerCommand('extension.convertToCamelCase', () => {
        convertCase('camel');
    });

    let disposablePascal = vscode.commands.registerCommand('extension.convertToPascalCase', () => {
        convertCase('pascal');
    });

    let disposableKebab = vscode.commands.registerCommand('extension.convertToKebabCase', () => {
        convertCase('kebab');
    });

    context.subscriptions.push(disposableSnake, disposableCamel, disposablePascal, disposableKebab);
}

function convertCase(format: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        let convertedText = '';

        switch (format) {
            case 'snake':
                convertedText = toSnakeCase(text);
                break;
            case 'camel':
                convertedText = toCamelCase(text);
                break;
            case 'pascal':
                convertedText = toPascalCase(text);
                break;
            case 'kebab':
                convertedText = toKebabCase(text);
                break;
        }

        editor.edit(editBuilder => {
            editBuilder.replace(selection, convertedText);
        });
    }
}

// Примерные функции преобразования
function toSnakeCase(text: string): string {
    // Логика преобразования в snake_case
    return text.replace(/\s+/g, '_').toLowerCase();
}

function toCamelCase(text: string): string {
    // Логика преобразования в camelCase
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase()).replace(/\s+/g, '');
}

function toPascalCase(text: string): string {
    // Логика преобразования в PascalCase
    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (match) => match.toUpperCase()).replace(/\s+/g, '');
}

function toKebabCase(text: string): string {
    // Логика преобразования в kebab-case
    return text.replace(/\s+/g, '-').toLowerCase();
}
