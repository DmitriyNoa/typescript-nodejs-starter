function HATEOAS(param: any): any {
  return (target: Object, propertyKey: string): TypedPropertyDescriptor<any> => {

    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    const originalMethod = descriptor.value;
    let HATEOASData = [];

    descriptor.value = function () {
      return originalMethod.apply(this, arguments)
        .then((response: Array<any>) => {
          HATEOASData = addSelfHATEOS(response, param);
          return Promise.resolve(HATEOASData);
        });
    };

    return descriptor;
  };
}

function addSelfHATEOS(data: Array<any>, metaData: any): Array<any> {
  return data.map((dataItem: any) => {
    return {
      content: {
        ...dataItem._doc
      },
      _links: [
        {
          rel:  "self",
          href: `/${metaData}/${dataItem._id}`
        }
      ]
    };
  });
}

export default HATEOAS;