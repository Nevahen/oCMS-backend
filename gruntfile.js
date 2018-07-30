module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        tsconfig: "./tsconfig.json",
        files: [
          {
            src: ["src/**/*.ts", "!src/.baseDir.ts"],
            dest: "./dist"
          }
        ]
      }
    },
    watch: {
      ts: {
        files: ["src/**/*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);
};
