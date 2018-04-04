import { Router } from "express";

export function RouteHandler(URL: string): any {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    const newConstructor: Function = function (args: any) {
      console.log(`Creating new instance.`);
      console.log(target.prototype._routes);
      target.prototype.router = Router();
      const route = target.prototype._routes[0];
      target.prototype._routes.forEach((route: any) => {
        target.prototype.router.route(route.url)[route.method](route.handler);
      });
    };
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;
    return <TFunction>newConstructor;
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