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

class ExternalDocs {
  /**
   * A short description of the target documentation. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * The URL for the target documentation. Value MUST be in the format of a URL.
   */
  url: string
  constructor({ description, url }: ExternalDocs) {
    this.description = description;
    this.url = url;
  }
}

/**
 * Allows referencing an external resource for extended documentation.
 */
export const externalDocs = (externalDocs: ExternalDocs) => new ExternalDocs(externalDocs);

//TODO:
class Parameter {
}

//TODO:
class Reference {

}

//TODO
class RequestBody {

}

//TODO
class Responses {

}

//TODO
class Callback {

}

//TODO
class SecurityRequirement {

}

class Operation {
  /**
   * A list of tags for API documentation control.
   * Tags can be used for logical grouping of operations by resources or any other qualifier.
   */
  tags?: string[]
  /**
   * A short summary of what the operation does.
   */
  summary?: string
  /**
   * A verbose explanation of the operation behavior. CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * Additional external documentation for this operation.
   */
  externalDocs?: ExternalDocs
  /**
   * Unique string used to identify the operation. The id MUST be unique among all operations described in the API.
   * The operationId value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an operation,
   * therefore, it is RECOMMENDED to follow common programming naming conventions.
   */
  operationId?: string
  /**
   * A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item,
   * the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters.
   * A unique parameter is defined by a combination of a name and location.
   * The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: (Parameter | Reference)[]
  /**
   * The request body applicable for this operation. The requestBody is only supported in HTTP methods
   * where the HTTP 1.1 specification RFC7231 has explicitly defined semantics for request bodies. 
   * In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
   */
  requestBody?: RequestBody | Reference
  /**
   * The list of possible responses as they are returned from executing this operation.
   */
  responses: Responses
  /**
   * A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object.
   * Each value in the map is a Callback Object that describes a request that may be initiated by the API provider and the expected responses.
   * The key value used to identify the callback object is an expression, evaluated at runtime, that identifies a URL to use for the callback operation.
   */
  callbacks?: { [name: string]: (Callback | Reference) }
  /**
   * Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is false.
   */
  deprecated?: boolean
  /**
   * A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used.
   * Only one of the security requirement objects need to be satisfied to authorize a request. This definition overrides any declared top-level security.
   * To remove a top-level security declaration, an empty array can be used.
   */
  security: SecurityRequirement
  /**
   * An alternative server array to service this operation. If an alternative server object is specified at the Path Item Object or Root level, it will be overridden by this value.
   */
  servers?: Server[]
  constructor({ tags, summary, description, externalDocs, operationId, parameters, requestBody, responses, callbacks, deprecated, security, servers }: Operation) {
    this.tags = tags;
    this.summary = summary;
    this.description = description;
    this.externalDocs = externalDocs;
    this.operationId = operationId;
    this.parameters = parameters;
    this.requestBody = requestBody;
    this.responses = responses;
    this.callbacks = callbacks;
    this.deprecated = deprecated;
    this.security = security;
    this.servers = servers;
  }
}

/**
 * Describes a single API operation on a path.
 */
export const operation = (operation: Operation) => new Operation(operation);

class Path {
  /**
   * Allows for an external definition of this path item.
   * The referenced structure MUST be in the format of a Path Item Object.
   * If there are conflicts between the referenced definition and this Path Item's definition, the behavior is undefined.
   */
  $ref:  string
  /**
   * An optional, string summary, intended to apply to all operations in this path.
   */
  summary?: string
  /**
   * An optional, string description, intended to apply to all operations in this path.
   * CommonMark syntax MAY be used for rich text representation.
   */
  description?: string
  /**
   * A definition of a GET operation on this path.
   */
  get?: Operation
  /**
   * A definition of a PUT operation on this path.
   */
  put?: Operation
  /**
   * A definition of a POST operation on this path.
   */
  post?: Operation
  /**
   * A definition of a DELETE operation on this path.
   */
  _delete?: Operation
  /**
   * A definition of a OPTIONS operation on this path.
   */
  options?: Operation
  /**
   * A definition of a HEAD operation on this path.
   */
  head?: Operation
  /**
   * A definition of a PATCH operation on this path.
   */
  patch?: Operation
  /**
   * A definition of a TRACE operation on this path.
   */
  trace?: Operation
  /**
   * An alternative server array to service all operations in this path.
   */
  servers?: Server[]
  /**
   * A list of parameters that are applicable for all the operations described under this path.
   * These parameters can be overridden at the operation level, but cannot be removed there.
   * The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location.
   * The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
   */
  parameters?: (Parameter | Reference)[]
  constructor({ $ref, summary, description, get, put, post,
    _delete, options, head, patch, trace, servers, parameters }: Path) {
    this.$ref = $ref;
    this.summary = summary;
    this.description = description;
    this.get = get;
    this.put = put;
    this.post = post;
    this._delete = _delete;
    this.options = options;
    this.head = head;
    this.patch = patch;
    this.trace = trace;
    this.servers = servers;
    this.parameters = parameters;
  }
}

/**
 * A relative path to an individual endpoint. The field name MUST begin with a slash.
 * The path is appended (no relative URL resolution) to the expanded URL from the Server Object's url field
 * in order to construct the full URL. Path templating is allowed.
 * When matching URLs, concrete (non-templated) paths would be matched before their templated counterparts.
 * Templated paths with the same hierarchy but different templated names MUST NOT exist as they are identical.
 * In case of ambiguous matching, it's up to the tooling to decide which one to use.
 */
export const path = (path: Path) => new Path(path);

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
  /**
   * The available paths and operations for the API.
   */
  paths: Path[]
  constructor({ openapi, info, servers, paths }: Api) {
    this.openapi = openapi;
    this.info = info;
    this.servers = servers;
    this.paths = paths;
  }
}

/**
 * This is the root document object of the OpenAPI document.
 */
export const api = (api: Api) => new Api(api);