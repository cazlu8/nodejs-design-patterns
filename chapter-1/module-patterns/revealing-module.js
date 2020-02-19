const module1 = (() => {
  const privateFoo = () => {
  
  };
  const privateBar = [];
  
  const exported = {
    publicFoo: () => {},
    publicBar: () => {}
  };
  
  return exported;
})();
console.log(module1);
