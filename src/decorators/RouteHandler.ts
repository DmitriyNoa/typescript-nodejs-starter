import { Router } from "express";

function RouteHandler(URL: string): any {
  return function handleROUTE<T extends { new (...args: any[]): any }>(target: T): T {
    return class HandleRoute extends target {
      constructor(...args: any[]) {
        super(...args);
        const self = this;
        target.prototype.router = Router();
        target.prototype._routes.forEach((route: any) => {
          target.prototype.router.route(route.url)[route.method](route.handler.bind(self));
        });
        args[0].addRoute(URL, target.prototype.router);
      }
    };
  };
}

function Get(param?: string): any {
  param = param || "/";
  return (target: any, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    target._routes = target._routes || [];
    target._routes.push({url: param, method: "get",  handler: originalMethod});
    return descriptor;
  };
}

function Post(param?: string): any {
  param = param || "/";
  return (target: any, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    target._routes = target._routes || [];
    target._routes.push({url: param, method: "post",  handler: originalMethod});
    return descriptor;
  };
}

function Put(param?: string): any {
  param = param || "/";
  return (target: any, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    target._routes = target._routes || [];
    target._routes.push({url: param, method: "post",  handler: originalMethod});
    return descriptor;
  };
}

function Delete(param?: string): any {
  param = param || "/";
  return (target: any, propertyKey: string): TypedPropertyDescriptor<any> => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalMethod = descriptor.value;
    target._routes = target._routes || [];
    target._routes.push({url: param, method: "post",  handler: originalMethod});
    return descriptor;
  };
}

export {RouteHandler, Get, Post, Put, Delete};