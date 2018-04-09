export function Validate(params: Array<any>): any {
  return (target: Object, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;

    descriptor.value = function () {
      const errors: Array<any> = [];
      const body = arguments[0];

      params.forEach((currentParam: any) => {
        switch (currentParam.validate) {
          case "email":
            const check = new RegExp("\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b", "gi");
            if (!check.test(body[currentParam.param])) {
              errors.push(currentParam);
            }
          break;
          case "required":
          default:
            if (!body[currentParam.param]) {
              errors.push(currentParam);
            }
          break;
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