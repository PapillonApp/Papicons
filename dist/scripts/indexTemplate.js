"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("node:path");
function PapiconsIndex(filePaths) {
    var exportEntries = filePaths.map(function (filePath) {
        var basename = path.basename(filePath.path, path.extname(filePath.path));
        return {
            basename: basename,
            exportName: /^\d/.test(basename) ? "Svg".concat(basename) : basename,
            filePath: filePath.originalPath
        };
    });
    //const iconNameConstants: string[] = exportEntries.map(entry => entry.exportName)
    var exportLines = exportEntries.map(function (entry) {
        return "export { default as ".concat(entry.exportName, " } from './").concat(entry.basename, "';");
    });
    return "\n//    .......           ........\n//  ...........        ..........                                                           ...\n//  ............      ............       ..............                                    .....\n// ..............    ..............      ................                                  .....\n// ..............    ..............      .................                                  ...\n// ..............   ...............      .....       .....  ..........    ..............   .....   ...........     ..........    .............     ..........\n//  ..............  ..............       .....       ..... .............  ...............  .....  .............  ..............  ............... .............\n//   .............  .............        .....      ............   .....  .......  ....... ..... ......  ..............  ....... .......  ...... .....   .....\n//     ...........  ...........          ................    ...........  .....      ..... ..........      .... .....      ..... .....     ..... ..........\n//    ............  ...........          ...............  ............... ....        .... ..........           ....       ..... .....      ....  ............\n//   .............  .............        ...........      ............... .....      ..... ..........      ..........      ..... .....      ....      .........\n//  ..............  ..............       .....            .....   ....... ........ ....... ..... ....... ....................... .....      .... ......   .....\n//  ..............  ..............       .....            ............... ...............  .....  .............  ..............  .....      .... ..............\n//  ..............  ..............       .....             .............. .............    .....   ..........      ..........    .....      ....   ..........\n//   ............    ............                                         ....\n//     .........      .........                                           ....\n//                                                                        ....\n\n".concat(exportLines.join('\n'), "\n\nexport enum IconNames {\n  ").concat(exportEntries.map(function (entry) { return "".concat(entry.exportName, " = \"").concat(entry.exportName, "\""); }).join(',\n  '), "\n}\n");
}
module.exports = PapiconsIndex;
