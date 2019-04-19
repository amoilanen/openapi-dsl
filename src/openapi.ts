/*
 * Typescript-based DSL for defining OpenAPI specifications.
 * Documentation comments and the API structure from https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md
 */

class Contact {
  /**
   * The identifying name of the contact person/organization.
   */
  name: string
  /**
   * The URL pointing to the contact information. MUST be in the format of a URL.
   */
  url?: string
  /**
   * The email address of the contact person/organization. MUST be in the format of an email address.
   */
  email: string
  constructor({ name, url, email}: Contact) {
    this.name = name;
    this.url = url;
    this.email = email;
  }
}

/**
 * Contact information for the exposed API.
 */
export const contact = (contact: Contact) => new Contact(contact);

class License {
  /**
   * The license name used for the API.
   */
  name: string
  /**
   * A URL to the license used for the API. MUST be in the format of a URL.
   */
  url?: string
  constructor({ name, url }: License) {
    this.name = name;
    this.url = url;
  }
}

/**
 * License information for the exposed API.
 */
export const license = (license: License) => new License(license);

class Info {
  /**
   * The title of the application.
   */
  title: string
  /**
   * The license information for the exposed API.
   */
  license?: License
  /**
   * The version of the OpenAPI document (which is distinct from the OpenAPI Specification version or the API implementation version).
   */
  version: string
  /**
   * A short description of the application. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * A URL to the Terms of Service for the API. MUST be in the format of a URL.
   */
  termsOfService?: string
  /**
   * The contact information for the exposed API.
   */
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

/**
 * Provides metadata about the API. The metadata MAY be used by tooling as required.
 */
export const info = (info: Info) => new Info(info);

class ServerVariable {
  /**
   * An enumeration of string values to be used if the substitution options are from a limited set.
   */
  _enum?: string[]
  /**
   * The default value to use for substitution, which SHALL be sent if an alternate value is not supplied.
   * Note this behavior is different than the Schema Object's treatment of default values,
   * because in those cases parameter values are optional.
   */
  _default: string
  /**
   * An optional description for the server variable. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  constructor({ _enum, _default, description }: ServerVariable) {
    this._enum = _enum;
    this._default = _default;
    this.description = description;
  }
}

/**
 * An object representing a Server Variable for server URL template substitution.
 */
export const serverVariable = (serverVariable: ServerVariable) => new ServerVariable(serverVariable);

class Server {
  /**
   * A URL to the target host. This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in {brackets}.
   */
  url: string
  /**
   * An optional string describing the host designated by the URL. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * A map between a variable name and its value. The value is used for substitution in the server's URL template.
   */
  variables?: { [name: string]: ServerVariable }
  constructor({ url, description, variables }: Server) {
    this.url = url;
    this.description = description;
    this.variables = variables;
  }
}

/**
 * An object representing a Server.
 */
export const server = (server: Server) => new Server(server);

class Api {
  /**
   * This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
   * The openapi field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document.
   * This is not related to the API info.version string.
   */
  openapi: string
  /**
   * Provides metadata about the API. The metadata MAY be used by tooling as required.
   */
  info: Info
  /**
   * An array of Server Objects, which provide connectivity information to a target server. 
   * If the servers property is not provided, or is an empty array,
   * the default value would be a Server Object with a url value of /.
   */
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