declare interface TokenType {
    accessToken: string
    refreshToken: string
    // x_tenant_id: string;
}

declare interface RefreshTokenRequest {
    refreshToken: string
    expiresInMins?: number
}

declare namespace Types {
    /** Utility type: ValueOf
     * @example
     *  const LocaleConfig = {
     *      EN: 'en',
     *      VI: 'vi',
     *  } as const
     *  type Locale = ValueOf<typeof LocaleConfig> => type WebConfigType.Locale = "en" | "vi"
     *  type LocaleEN = ValueOf<typeof LocaleConfig, 'EN'> => type WebConfigType.LocaleEN = "en"
     */
    type ValueOf<ObjectType, ValueType extends keyof ObjectType = keyof ObjectType> = ObjectType[ValueType]
    type Object<T> = Record<string, T>
    type Nullable<T> = T | null
    type Undefined<T> = T | undefined
    /**
     * Exclude null and undefined from T
     */
    type NonNullable<T> = T extends null | undefined ? never : T
    type NonUndefined<T> = T extends undefined ? never : T
    type Class = {
        new (...args: any[]): any
    }
    type Brand<K, T> = K & {
        __brand: T
    }
    type Deferrable<T> = {
        [K in keyof T]: T[K]
    }
    type NodeJSInterval = Nullable<NodeJS.Timeout | string | number | undefined>
    type NodeJSTimeout = Nullable<NodeJS.Timeout | string | number | undefined>
}
