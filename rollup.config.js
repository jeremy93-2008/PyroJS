import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import shebang from 'rollup-plugin-preserve-shebang';
import json from "@rollup/plugin-json";

export default [
    {
        input: 'src/app/index.ts',
        output: [
            {
                file: "dist/app/index.js",
                format: 'cjs',
                exports: 'named',
                sourcemap: true
            }
        ],
        plugins: [
            json(),
            resolve(),
            typescript({
                rollupCommonJSResolveHack: true,
                exclude: '**/__tests__/**',
                clean: true
            }),
            commonjs({
                include: ['node_modules/**']
            })
        ]
    },
    {
        input: 'src/cli/index.ts',
        output: [
            {
                file: "dist/index.js",
                format: 'cjs',
                sourcemap: true
            }
        ],
        external: ["ms"],
        plugins: [
            resolve({ preferBuiltins: true }),
            commonjs({
                include: ['node_modules/**']
            }),
            json(),
            shebang(),
            typescript({
                rollupCommonJSResolveHack: true,
                exclude: '**/__tests__/**',
                clean: true
            }),
        ]
    }
]
