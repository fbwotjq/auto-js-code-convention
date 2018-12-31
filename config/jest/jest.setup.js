/**
 * 1.Defines the React 16 Adapter for Enzyme.
 * @link http://airbnb.io/enzyme/docs/installation/#working-with-react-16
 *
 * 2.Test Setup with JSDOM
 * enzyme에서 mount시에 Enzyme's mount expects a DOM environment to be loaded, but found none를 해결하기 위해서
 * @link https://github.com/airbnb/enzyme/issues/1558
 */
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

// test setup with JSDOM
const { JSDOM } = require('jsdom')
const jsDom = new JSDOM('<!doctype html><html><body/></html>')
const { window } = jsDom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }),
      {}
    )
  Object.defineProperties(target, props)
}

//setting globals to keep test clean
global.window = window
global.document = window.document
global.window.print = () => {}
global.window.open = () => {
  return { print: () => {} }
}
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)

// React 16에 대한 enzyme adapter 추가
enzyme.configure({ adapter: new Adapter() })
