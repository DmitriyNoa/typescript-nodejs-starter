import { Router } from "express";

export function RouteHandler(URL: string): any {
  return function final<T extends { new (...args: any[]): object }>(target: T): T {
    return class Final extends target {
      constructor(...args: any[]) {
        super(...args);
        const self = this;
        target.prototype.router = Router();
        target.prototype._routes.forEach((route: any) => {
          target.prototype.router.route(route.url)[route.method](route.handler.bind(self));
        });
      }
    };
  };
}

export function Get(param?: string): any {
  param = param || "/";
  return (target: any, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    target._routes = target._routes || [];
    target._routes.push({url: param, method: "get",  handler: originalMethod});
    return descriptor;
  };
}

export function Post(param?: string): any {
  param = param || "/";
  return (target: any, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    target._routes = target._routes || [];
    target._routes.push({url: param, method: "post",  handler: originalMethod});
    return descriptor;
  };
}