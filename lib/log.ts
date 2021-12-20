const debug = process?.env?.NODE_ENV === 'development' ? console.log : () => {};

export default { debug };
