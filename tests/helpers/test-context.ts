import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import {
  type default as Owner,
  type DIRegistry,
  type Factory,
  type FullName,
  type RegisterOptions,
} from '@ember/owner';
import { getContext } from '@ember/test-helpers';

export type { DIRegistry, FullName, Owner, RegisterOptions };

/**
 * @see https://github.com/sindresorhus/type-fest/blob/v3.5.2/source/omit-index-signature.d.ts
 */
type OmitIndexSignature<ObjectType> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType];
};

export type ValidType = keyof OmitIndexSignature<DIRegistry> & string;

export type ValidName<Type extends ValidType> = keyof OmitIndexSignature<
  DIRegistry[Type]
> &
  string;

/**
 * @returns Whether {@link factory} is a {@link Factory}.
 */
export const isFactory = <T>(factory: unknown): factory is Factory<T> =>
  Boolean(factory) && typeof (factory as Factory<T>).create === 'function';

export function getTestContextOwner(): Owner {
  const context = getContext();
  assert(
    `Could not retrieve test context. Did you forget to use a test setup function first (e.g. \`setupTest\`)?`,
    context,
  );

  const owner = getOwner(context);
  assert(
    `Could not retrieve test context owner. Did you forget to use a test setup function first (e.g. \`setupTest\`)?`,
    owner,
  );

  return owner;
}

export const lookup = ((...args: Parameters<Owner['lookup']>) =>
  getTestContextOwner().lookup(...args)) as Owner['lookup'];

export const factoryFor = ((...args: Parameters<Owner['factoryFor']>) =>
  getTestContextOwner().factoryFor(...args)) as Owner['factoryFor'];

// export const register = ((...args: Parameters<Owner['register']>) =>
// getTestContextOwner().register(...args)) as Owner['register'];

// @register(id, { instantiate: false }) class { ... }
export function register<Type extends ValidType, Name extends ValidName<Type>>(
  fullName: FullName<Type, Name>,
  options: RegisterOptions & { instantiate: false },
): <T extends DIRegistry[Type][Name]>(factory: T) => T;

// @register(id, { instantiate: true }) class { static create() }
// @register(id) class { static create() }
export function register<Type extends ValidType, Name extends ValidName<Type>>(
  fullName: FullName<Type, Name>,
  options?: RegisterOptions,
): <F extends Factory<DIRegistry[Type][Name]>>(factory: F) => F;

// register(id, { instantiate: false }, class { ... })
// register(id, { instantiate: false }, { ... })
export function register<
  Type extends ValidType,
  Name extends ValidName<Type>,
  T extends DIRegistry[Type][Name],
>(
  fullName: FullName<Type, Name>,
  options: RegisterOptions & { instantiate: false },
  factory: T,
): T;

// register(id, { instantiate: true }, class { static create() })
// register(id, { ... }, class { static create() })
export function register<
  Type extends ValidType,
  Name extends ValidName<Type>,
  T extends DIRegistry[Type][Name],
  F extends Factory<T>,
>(fullName: FullName<Type, Name>, options: RegisterOptions, factory: F): F;

// register(id, class { static create() })
export function register<
  Type extends ValidType,
  Name extends ValidName<Type>,
  T extends DIRegistry[Type][Name],
  F extends Factory<T>,
>(fullName: FullName<Type, Name>, factory: F): F;

export function register<
  Type extends ValidType,
  Name extends ValidName<Type>,
  T extends DIRegistry[Type][Name],
  F extends Factory<T>,
>(
  ...[fullName, optionsOrFactory, factory]:
    | [
        fullName: FullName<Type, Name>,
        options?: RegisterOptions,
        factory?: T | F,
      ]
    | [fullName: FullName<Type, Name>, factory?: F]
    | [fullName: FullName<Type, Name>]
): T | F | ((factory: T) => T) | ((factory: F) => F) {
  if (!factory) {
    if (isFactory(optionsOrFactory) || typeof optionsOrFactory === 'function') {
      // register(id, class { static create() })
      return registerFactory(fullName, optionsOrFactory) as T | F;
    }

    // @register(id) class { static create() }
    // @register(id, options) class { static create() }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return (factory: F) =>
      registerFactory(fullName, factory, optionsOrFactory) as F;
  }

  // register(id, options, class { static create() })
  // register(id, { instantiate: false }, { ... })
  return registerFactory(
    fullName,
    factory,
    optionsOrFactory as RegisterOptions | undefined,
  );
}

/**
 * Registers {@link factory} as {@link identifier} using {@link options} on
 * {@link owner}.
 *
 * @param identifier The {@link FactoryIdentifier} to register {@link factory}
 * as.
 * @param factory The {@link Factory} to register.
 * @param owner By default the {@link Owner} returned from
 * {@link getTestContextOwner} is used. Setting this option allows you to
 * specify the {@link Owner} explicitly instead.
 * @param options Optional {@link RegisterOptions} passed to
 * {@link Owner.register}.
 * @returns The passed {@link factory} for convenience.
 * @internal
 *
 * @see {@link register}
 */
function registerFactory<
  Type extends ValidType,
  Name extends ValidName<Type>,
  T extends DIRegistry[Type][Name] | Factory<DIRegistry[Type][Name]>,
>(fullName: FullName<Type, Name>, factory: T, options?: RegisterOptions): T {
  assert(
    `Could not register '${fullName}' as the \`Factory\` misses a \`static create()\` method. Either add the method or pass the \`{ instantiate: false }\` option.`,
    options?.instantiate === false || isFactory(factory),
  );

  getTestContextOwner().register(fullName, factory, options);

  return factory;
}
