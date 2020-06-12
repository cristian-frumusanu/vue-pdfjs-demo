const objectToFormData = (theObject: object): FormData => {
  const formData = new FormData();
  Object.keys(theObject).forEach((key) => {
    // @ts-ignore
    formData.set(key, theObject[key]);
  });
  return formData;
};

const cloneObject = <T>( object: T ): T => {
  return JSON.parse( JSON.stringify( object ) );
};

export {
  objectToFormData,
  cloneObject
};
