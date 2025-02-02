export const testshader = {
    name: "testShader",
    uniforms: {},
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        void main() {
            gl_FragColor = vec4( 1.0, 0.3, 0.8, 1.0 );
        }
    `,
}