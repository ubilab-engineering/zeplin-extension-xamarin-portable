/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */
import colorsTemplate from './templates/colors.mustache';
import namespaceTemplate from './templates/namespace.mustache';
import indentString from 'indent-string';

  function actualKey(context, key) {    
    return key.replace(/\s/g, '');
  }

function HexColor(context, color) {
  
  var hexcolor = color.toHex();
    return {
      key:  color.name,
      color: (`#${hexcolor.r}${hexcolor.g}${hexcolor.b}`),
    };
  }



function layer(context, selectedLayer) {

}

function styleguideColors(context, colors) {
    let processedColors = colors;
    const code = colorsTemplate({
        colors: processedColors.map(color => HexColor(context, color)),
        //solidColorBrushes: processedColors.map(color => xamlSolidColorBrush(context, color)),
      });
    return CSharpiOSCode(code);
}

function styleguideTextStyles(context, textStyles) {
}

function exportStyleguideColors(context, colors) {
    const resources = indentString(styleguideColors(context, colors).code, 4);
    const namescpaceName = context.getOption('namescpaceName');
    const resourceDictionary = indentString(namespaceTemplate({resources,namescpaceName }),0);
    return CSharpiOSFile(resourceDictionary, 'UIColorStyle.cs');
}

function exportStyleguideTextStyles(context, colors) {
  
}

function comment(context, text) {

}

function CSharpiOSCode(code) {
    return {
      code,
      language: 'swift',
    };
  }

  function CSharpiOSFile(code, filename) {
    return {
      code,
      language: 'cs',
      filename,
    };
  }
  

export default {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};