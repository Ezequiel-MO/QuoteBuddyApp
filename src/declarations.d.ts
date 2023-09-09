//para que funcione css module

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }