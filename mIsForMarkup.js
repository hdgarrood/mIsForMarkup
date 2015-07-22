window.mIsForMarkup = (function() {
"use strict"
var exports = {}

function looksLikeAttributes(obj) {
  return typeof obj === 'object' && !looksLikeHtmlElement(obj)
}

function looksLikeHtmlElement(obj) {
  return obj && obj.nodeType !== undefined
}

function insertChild(el, child) {
  if (looksLikeHtmlElement(child)) {
    el.appendChild(child)
  } else if (typeof child === 'string') {
    var textNode = document.createTextNode(child)
    el.appendChild(textNode)
  } else if (child instanceof Array) {
    child.forEach(function(c) {
      insertChild(el, c)
    })
  } else if (child === null) {
    // no-op
  } else {
    throw new Error("mIsForMarkup: Don't know what to do with this object")
  }
}

exports.tag = function tag() {
  var args = Array.prototype.slice.call(arguments)
  var tagName = args.shift()
  var el = document.createElement(tagName)

  if (looksLikeAttributes(args[0])) {
    var attrs = args.shift()
    for (var prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        el.setAttribute(prop, attrs[prop])
      }
    }
  }

  while (args.length > 0) {
    var child = args.shift()
    insertChild(el, child)
  }

  return el
}

// Partially apply a function of two or more arguments.
function partial(fn, arg) {
  return function() {
    return fn.apply(fn, [arg].concat(Array.prototype.slice.call(arguments)))
  }
}

var tagNames =
  [ 'a'
  , 'abbr'
  , 'address'
  , 'area'
  , 'article'
  , 'aside'
  , 'audio'
  , 'b'
  , 'base'
  , 'bdi'
  , 'bdo'
  , 'blockquote'
  , 'body'
  , 'br'
  , 'button'
  , 'canvas'
  , 'caption'
  , 'cite'
  , 'code'
  , 'col'
  , 'colgroup'
  , 'command'
  , 'datalist'
  , 'dd'
  , 'del'
  , 'details'
  , 'dfn'
  , 'div'
  , 'dl'
  , 'dt'
  , 'em'
  , 'embed'
  , 'fieldset'
  , 'figcaption'
  , 'figure'
  , 'footer'
  , 'form'
  , 'h1'
  , 'h2'
  , 'h3'
  , 'h4'
  , 'h5'
  , 'h6'
  , 'head'
  , 'header'
  , 'hgroup'
  , 'hr'
  , 'html'
  , 'i'
  , 'iframe'
  , 'img'
  , 'input'
  , 'ins'
  , 'kbd'
  , 'keygen'
  , 'label'
  , 'legend'
  , 'li'
  , 'link'
  , 'map'
  , 'mark'
  , 'main'
  , 'math'
  , 'menu'
  , 'menuitem'
  , 'meta'
  , 'meter'
  , 'nav'
  , 'noscript'
  , 'object'
  , 'ol'
  , 'optgroup'
  , 'option'
  , 'output'
  , 'p'
  , 'param'
  , 'pre'
  , 'progress'
  , 'q'
  , 'rp'
  , 'rt'
  , 'ruby'
  , 's'
  , 'samp'
  , 'script'
  , 'section'
  , 'select'
  , 'small'
  , 'source'
  , 'span'
  , 'strong'
  , 'style'
  , 'sub'
  , 'summary'
  , 'sup'
  , 'svg'
  , 'table'
  , 'tbody'
  , 'td'
  , 'template'
  , 'textarea'
  , 'tfoot'
  , 'th'
  , 'thead'
  , 'time'
  , 'title'
  , 'tr'
  , 'track'
  , 'u'
  , 'ul'
  , 'var'
  , 'video'
  , 'wbr'
  ]

tagNames.forEach(function(tagName) {
  exports[tagName] = partial(exports.tag, tagName)
})

return exports
})()
