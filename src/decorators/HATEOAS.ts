function HATEOAS(param: any): any {
  return (target: Object, propertyKey: string): TypedPropertyDescriptor<any> => {

    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    const originalMethod = descriptor.value;
    let hateousData = [];

    descriptor.value = function () {
      return originalMethod.apply(this, arguments)
        .then((response: Array<any>) => {
          hateousData = addHATEOS(response, param);
          return Promise.resolve(hateousData);
        });
    };

    return descriptor;
  };
}

function addHATEOS(data: Array<any>, metaData: any): Array<any> {
  return data.map((dataItem: any) => {
    return {
      ...dataItem._doc,
      links: [
        {
          rel:  "self",
          href: `/${metaData}/${dataItem._id}`
        }
      ]
    };
  });
}

export default HATEOAS;