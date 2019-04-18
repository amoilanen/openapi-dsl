class Contact {
  name: string
  url?: string
  email: string
  constructor({ name, url, email}: Contact) {
    this.name = name;
    this.url = url;
    this.email = email;
  }
}

export const contact = (contact: Contact) => new Contact(contact);

class License {
  name: string
  url?: string
  constructor({ name, url }: License) {
    this.name = name;
    this.url = url;
  }
}

export const license = (license: License) => new License(license);

class Info {
  title: string
  license: License
  version: string
  description?: string
  termsOfService?: string
  contact?: Contact
  constructor({ title, description, termsOfService, contact, license, version }: Info) {
    this.title = title;
    this.description = description;
    this.termsOfService = termsOfService;
    this.contact = contact;
    this.license = license;
    this.version = version;
  }
}

export const info = (info: Info) => new Info(info);

class ServerVariable {
  _enum?: string[]
  _default: string
  description?: string
  constructor({ _enum, _default, description }: ServerVariable) {
    this._enum = _enum;
    this._default = _default;
    this.description = description;
  }
}

export const serverVariable = (serverVariable: ServerVariable) => new ServerVariable(serverVariable);

class Server {
  url: string
  description?: string
  variables?: { [name: string]: ServerVariable }
  constructor({ url, description, variables }: Server) {
    this.url = url;
    this.description = description;
    this.variables = variables;
  }
}

export const server = (server: Server) => new Server(server);

class Api {
  /**
   * This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
   * The openapi field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document.
   * This is not related to the API info.version string.
   */
  openapi: string
  info: Info
  servers?: Server[]
  constructor({ openapi, info, servers }: Api) {
    this.openapi = openapi;
    this.info = info;
    this.servers = servers;
  }
}

export const api = (api: Api) => new Api(api);

api({
  openapi: '3.0.0',
  info: info({
    version: '1.0.0',
    title: 'Swagger Petstore',
    license: license({
      name: 'MIT'
    })
  }),
  servers: [
    server({
      url: 'http://petstore.swagger.io/v1'
    })
  ]
});