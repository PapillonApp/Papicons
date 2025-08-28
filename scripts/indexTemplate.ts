import * as path from 'node:path'

type FilePath = {
  path: string;
  originalPath: string;
}

type ExportEntry = {
  basename: string;
  exportName: string;
  filePath: string;
}

function PapiconsIndex(filePaths: FilePath[]): string {
  const exportEntries: ExportEntry[] = filePaths.map((filePath: FilePath) => {
    const basename = path.basename(filePath.path, path.extname(filePath.path))
    return {
      basename,
      exportName: /^\d/.test(basename) ? `Svg${basename}` : basename,
      filePath: filePath.originalPath
    }
  })

  //const iconNameConstants: string[] = exportEntries.map(entry => entry.exportName)

  const exportLines: string[] = exportEntries.map((entry: ExportEntry) => {
    return `export { default as ${entry.exportName} } from './${entry.basename}';`
  })

  return `
//    .......           ........
//  ...........        ..........                                                           ...
//  ............      ............       ..............                                    .....
// ..............    ..............      ................                                  .....
// ..............    ..............      .................                                  ...
// ..............   ...............      .....       .....  ..........    ..............   .....   ...........     ..........    .............     ..........
//  ..............  ..............       .....       ..... .............  ...............  .....  .............  ..............  ............... .............
//   .............  .............        .....      ............   .....  .......  ....... ..... ......  ..............  ....... .......  ...... .....   .....
//     ...........  ...........          ................    ...........  .....      ..... ..........      .... .....      ..... .....     ..... ..........
//    ............  ...........          ...............  ............... ....        .... ..........           ....       ..... .....      ....  ............
//   .............  .............        ...........      ............... .....      ..... ..........      ..........      ..... .....      ....      .........
//  ..............  ..............       .....            .....   ....... ........ ....... ..... ....... ....................... .....      .... ......   .....
//  ..............  ..............       .....            ............... ...............  .....  .............  ..............  .....      .... ..............
//  ..............  ..............       .....             .............. .............    .....   ..........      ..........    .....      ....   ..........
//   ............    ............                                         ....
//     .........      .........                                           ....
//                                                                        ....

${exportLines.join('\n')}

export enum IconNames {
  ${exportEntries.map(entry => `${entry.exportName} = "${entry.exportName}"`).join(',\n  ')}
}
`
}

module.exports = PapiconsIndex
