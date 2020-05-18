'use strict';

if (!Object.entries) Object.entries = function (obj) {
  var ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i); // preallocate the Array

  while (i--) {
    resArray[i] = [ownProps[i], obj[ownProps[i]]];
  }

  return resArray;
};

var cloneDeep = require('lodash/cloneDeep');

module.exports = function (options) {
  options = options || {}; // console.log(options)

  return function addCustomNodeAttr(tree) {
    var _loop = function _loop(tag) {
      if (Object.hasOwnProperty.call(options, tag)) {
        tree.match({
          tag: tag
        }, function (node) {
          node = addClass(node, options[tag]);
          node = addStyle(node, options[tag]); // node = addId(node, options[tag])

          return node;
        });
      }
    };

    for (var tag in options) {
      _loop(tag);
    }

    return tree;
  };
};
/**
 * 增加class类
 * @param node 当前节点
 * @param options 当前节点对应的配置
 * @returns {*}
 */


function addClass(node, options) {
  if (options && options["class"] && options["class"].length > 0) {
    var _node = cloneDeep(node);

    var _class = node.attrs && node.attrs["class"] && node.attrs["class"].split(' ') || []; // 去重并防止有undefined和null


    var newClass = _class.concat(options["class"] || []).reduce(function (pre, current, index, arr) {
      if (current && !pre.includes(current)) {
        pre.push(current);
      }

      return pre;
    }, []); // 若class中没有值则删除这个对象


    if (!newClass || newClass.length === 0) {
      delete _node.attrs["class"];
    } else {
      _node.attrs && (_node.attrs["class"] = newClass.join(' '));
    }

    return _node;
  }

  return node;
}
/**
 * 增加内联样式
 * @param node
 * @param options
 * @returns {*}
 */


function addStyle(node, options) {
  if (options && options.style && Object.keys(options.style).length > 0) {
    var _node = cloneDeep(node);

    var newStyle = options.style;
    var oldStyle = node.attrs.style;
    var newStyleStr = Object.entries(newStyle).map(function (item) {
      item[0] = toLine(item[0]);
      item = item.join(':');
      return item;
    }).join(';') + ';';
    _node.attrs.style = newStyleStr + oldStyle;
    return _node;
  }

  return node;
}

function addId(node, options) {
  // todo: 增加ID
  if (options && options.id) {
    var _node = cloneDeep(node);
  }

  return node;
} // 把驼峰转为中划线


function toLine(name) {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
} // 中划线转驼峰


function toHump(name) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
