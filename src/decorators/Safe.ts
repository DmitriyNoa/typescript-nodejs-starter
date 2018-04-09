function Safe(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {

  const originalMethod = descriptor.value;

  descriptor.value = function () {
    try {
      originalMethod.apply(this, arguments);
    } catch (ex) {
      console.error(ex);
    }
  };

  return descriptor;
}
export  default Safe;