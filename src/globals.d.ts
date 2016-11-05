declare module '*.html' {
    const _: string;
    export = _;
}

// fix angular2-template-loader error: Cannot find name 'require':
declare function require(string: string): any;
