export function funcToSource(fn, sourcemapArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var source = fn.toString();
    var regex = /(['"])__worker_loader_strict__(['"])/g;
    var lines = [];

    // Ref: https://github.com/Kitware/vtk-js/pull/2361/commits/16a07df4116d1409d0650139c21badd744de1402
    // instead of extracting the function source code, just return the function as if it's being evaluated
    // by the caller.
    source = source.replace(regex, '$1use strict$2');
    lines.push('(' + source + ')()');

    if (sourcemap) {
        lines.push('\/\/# sourceMappingURL=' + sourcemap + '\n');
    }
    return lines;
}
