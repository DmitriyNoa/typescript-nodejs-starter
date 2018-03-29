export function Validate(params: Array<any>): any {
  return (target: Object, propertyKey: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      const errors: Array<any> = [];
      const body = arguments[0];
      params.forEach((currentParam: any) => {
        if (!body[currentParam.param]) {
          errors.push(currentParam);
        }
      });

      if (errors.length) {
        return Promise.reject(errors);
      } else {
        return originalMethod.apply(this, arguments);
      }
    };
    return descriptor;
  };
}