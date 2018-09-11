export default (name = false) => () => import(`components/${name}.vue`);
