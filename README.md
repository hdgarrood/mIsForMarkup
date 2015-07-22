# m is for markup

Yet another templating library for JavaScript. Sorry not sorry.

## synopsis

```javascript
var m = window.mIsForMarkup

document.body.appendChild(
  m.main({role: 'main'},
    m.div({class: 'super'},
      m.h1("M Is For Markup"),
      m.p(
        m.em("m is for markup"),
        " is yet another templating library for JavaScript."
      )
    )
  )
)
```

## features

m is for markup:

* Literally could not be simpler (0 dependencies, about 48 lines of actual code)
* Trusts you to separate your model from your view
* Doesn't require you to learn a separate language for templating
* Allows you to use the full power of JS for templating (eg: partials are just
  functions)

## api

### `mIsForMarkup([attrs], [children...]) => HTMLElement`

* If the first argument is an Object, then it is used to set attributes of the
  returned element.
* All other arguments are used as children.
* If a HTMLElement is passed, it is inserted as-is, as a child element.
* If a String is passed, it is inserted as a text node.
* If an Array is passed, each element is treated as a separate child.
* If `null` is passed, it is ignored. This is useful for displaying things
  conditionally.
* If anything else is passed, an error is thrown.

For example:

```javascript
m.br()
  // => <br>

m.p("hi")
  // => <p>hi</p>

m.form({method: 'get'}, m.input({type: 'submit'}))
  // => <form method="get"><input type="submit"></input></form>

function renderResults(results) {
  return m.div({class: 'results'},
    results.length === 0
      ? m.p({class: 'error'}, 'No results for that query, sorry')
      : results.map(function(r) {
          return m.p({class: 'result'},
            m.strong(r.book), " by ", m.em(r.author))
        })
    )
}

renderResults(
  [ {book: 'Great Expectations', author: 'Dickens'}
  , {book: 'The Wind in the Willows', author: 'Grahame'}
  ])
  /* =>
    <div class="results">
      <p class="result"><strong>Great Expectations</strong> by <em>Dickens</em></p>
      <p class="result"><strong>The Wind in the Willows</strong> by <em>Grahame</em></p>
    </div>
  */

renderResults([])
  /* =>
    <div class="results">
      <p class="error">No results for that query, sorry</p>
    </div>
  */
