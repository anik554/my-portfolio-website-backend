import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AuthProviderScalarFieldEnumSchema = z.enum(['id','userId','provider','providerId']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','role','phone','picture','status','isVerified','createdAt','updatedAt']);

export const BlogScalarFieldEnumSchema = z.enum(['id','title','content','thumbnail','isFeatured','tags','views','authorId','createdAt','updatedAt']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','title','description','thumbnail','repoLink','liveLink','features','technologies','authorId','createdAt','updatedAt']);

export const ProfileScalarFieldEnumSchema = z.enum(['id','userId','title','bio','avatar','phone','location','github','linkedin','skills','experience','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['SUPER_ADMIN','ADMIN','USER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const UserStatusSchema = z.enum(['ACTIVE','INACTIVE','BLOCKED']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// AUTH PROVIDER SCHEMA
/////////////////////////////////////////

export const AuthProviderSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  provider: z.string(),
  providerId: z.string(),
})

export type AuthProvider = z.infer<typeof AuthProviderSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  status: UserStatusSchema,
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  password: z.string().nullable(),
  phone: z.string(),
  picture: z.string().nullable(),
  isVerified: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// BLOG SCHEMA
/////////////////////////////////////////

export const BlogSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().nullable(),
  isFeatured: z.boolean(),
  tags: z.string().array(),
  views: z.number().int(),
  authorId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Blog = z.infer<typeof BlogSchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().nullable(),
  repoLink: z.string().nullable(),
  liveLink: z.string().nullable(),
  features: z.string().array(),
  technologies: z.string().array(),
  authorId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  title: z.string(),
  bio: z.string().nullable(),
  avatar: z.string().nullable(),
  phone: z.string().nullable(),
  location: z.string().nullable(),
  github: z.string().nullable(),
  linkedin: z.string().nullable(),
  skills: z.string().array(),
  experience: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// AUTH PROVIDER
//------------------------------------------------------

export const AuthProviderIncludeSchema: z.ZodType<Prisma.AuthProviderInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AuthProviderArgsSchema: z.ZodType<Prisma.AuthProviderDefaultArgs> = z.object({
  select: z.lazy(() => AuthProviderSelectSchema).optional(),
  include: z.lazy(() => AuthProviderIncludeSchema).optional(),
}).strict();

export const AuthProviderSelectSchema: z.ZodType<Prisma.AuthProviderSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  blogs: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  auths: z.union([z.boolean(),z.lazy(() => AuthProviderFindManyArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  blogs: z.boolean().optional(),
  auths: z.boolean().optional(),
  projects: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  phone: z.boolean().optional(),
  picture: z.boolean().optional(),
  status: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  blogs: z.union([z.boolean(),z.lazy(() => BlogFindManyArgsSchema)]).optional(),
  auths: z.union([z.boolean(),z.lazy(() => AuthProviderFindManyArgsSchema)]).optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BLOG
//------------------------------------------------------

export const BlogIncludeSchema: z.ZodType<Prisma.BlogInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const BlogArgsSchema: z.ZodType<Prisma.BlogDefaultArgs> = z.object({
  select: z.lazy(() => BlogSelectSchema).optional(),
  include: z.lazy(() => BlogIncludeSchema).optional(),
}).strict();

export const BlogSelectSchema: z.ZodType<Prisma.BlogSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  thumbnail: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.boolean().optional(),
  views: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  thumbnail: z.boolean().optional(),
  repoLink: z.boolean().optional(),
  liveLink: z.boolean().optional(),
  features: z.boolean().optional(),
  technologies: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// PROFILE
//------------------------------------------------------

export const ProfileIncludeSchema: z.ZodType<Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const ProfileArgsSchema: z.ZodType<Prisma.ProfileDefaultArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  title: z.boolean().optional(),
  bio: z.boolean().optional(),
  avatar: z.boolean().optional(),
  phone: z.boolean().optional(),
  location: z.boolean().optional(),
  github: z.boolean().optional(),
  linkedin: z.boolean().optional(),
  skills: z.boolean().optional(),
  experience: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AuthProviderWhereInputSchema: z.ZodType<Prisma.AuthProviderWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuthProviderWhereInputSchema), z.lazy(() => AuthProviderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthProviderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthProviderWhereInputSchema), z.lazy(() => AuthProviderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AuthProviderOrderByWithRelationInputSchema: z.ZodType<Prisma.AuthProviderOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AuthProviderWhereUniqueInputSchema: z.ZodType<Prisma.AuthProviderWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.strictObject({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AuthProviderWhereInputSchema), z.lazy(() => AuthProviderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthProviderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthProviderWhereInputSchema), z.lazy(() => AuthProviderWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AuthProviderOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuthProviderOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuthProviderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AuthProviderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuthProviderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuthProviderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AuthProviderSumOrderByAggregateInputSchema).optional(),
});

export const AuthProviderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuthProviderScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuthProviderScalarWhereWithAggregatesInputSchema), z.lazy(() => AuthProviderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthProviderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthProviderScalarWhereWithAggregatesInputSchema), z.lazy(() => AuthProviderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  picture: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema), z.lazy(() => UserStatusSchema) ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  blogs: z.lazy(() => BlogListRelationFilterSchema).optional(),
  auths: z.lazy(() => AuthProviderListRelationFilterSchema).optional(),
  projects: z.lazy(() => ProjectListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema), z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  picture: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  blogs: z.lazy(() => BlogOrderByRelationAggregateInputSchema).optional(),
  auths: z.lazy(() => AuthProviderOrderByRelationAggregateInputSchema).optional(),
  projects: z.lazy(() => ProjectOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  picture: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema), z.lazy(() => UserStatusSchema) ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  blogs: z.lazy(() => BlogListRelationFilterSchema).optional(),
  auths: z.lazy(() => AuthProviderListRelationFilterSchema).optional(),
  projects: z.lazy(() => ProjectListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableScalarRelationFilterSchema), z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  picture: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  picture: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusWithAggregatesFilterSchema), z.lazy(() => UserStatusSchema) ]).optional(),
  isVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const BlogWhereInputSchema: z.ZodType<Prisma.BlogWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BlogWhereInputSchema), z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogWhereInputSchema), z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isFeatured: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const BlogOrderByWithRelationInputSchema: z.ZodType<Prisma.BlogOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isFeatured: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const BlogWhereUniqueInputSchema: z.ZodType<Prisma.BlogWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.strictObject({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => BlogWhereInputSchema), z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogWhereInputSchema), z.lazy(() => BlogWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isFeatured: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const BlogOrderByWithAggregationInputSchema: z.ZodType<Prisma.BlogOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  isFeatured: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BlogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BlogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BlogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BlogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BlogSumOrderByAggregateInputSchema).optional(),
});

export const BlogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BlogScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BlogScalarWhereWithAggregatesInputSchema), z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogScalarWhereWithAggregatesInputSchema), z.lazy(() => BlogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  isFeatured: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  views: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  authorId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema), z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema), z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  repoLink: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  liveLink: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  features: z.lazy(() => StringNullableListFilterSchema).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  repoLink: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  liveLink: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  features: z.lazy(() => SortOrderSchema).optional(),
  technologies: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.strictObject({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema), z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema), z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  repoLink: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  liveLink: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  features: z.lazy(() => StringNullableListFilterSchema).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  repoLink: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  liveLink: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  features: z.lazy(() => SortOrderSchema).optional(),
  technologies: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectSumOrderByAggregateInputSchema).optional(),
});

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema), z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema), z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  repoLink: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  liveLink: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  features: z.lazy(() => StringNullableListFilterSchema).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  authorId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const ProfileWhereInputSchema: z.ZodType<Prisma.ProfileWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema), z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema), z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  github: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  skills: z.lazy(() => StringNullableListFilterSchema).optional(),
  experience: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const ProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  github: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    userId: z.number().int(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    userId: z.number().int(),
  }),
])
.and(z.strictObject({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema), z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema), z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  github: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  skills: z.lazy(() => StringNullableListFilterSchema).optional(),
  experience: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  github: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputSchema).optional(),
});

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  github: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  linkedin: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  skills: z.lazy(() => StringNullableListFilterSchema).optional(),
  experience: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const AuthProviderCreateInputSchema: z.ZodType<Prisma.AuthProviderCreateInput> = z.strictObject({
  provider: z.string(),
  providerId: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuthsInputSchema),
});

export const AuthProviderUncheckedCreateInputSchema: z.ZodType<Prisma.AuthProviderUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  userId: z.number().int(),
  provider: z.string(),
  providerId: z.string(),
});

export const AuthProviderUpdateInputSchema: z.ZodType<Prisma.AuthProviderUpdateInput> = z.strictObject({
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuthsNestedInputSchema).optional(),
});

export const AuthProviderUncheckedUpdateInputSchema: z.ZodType<Prisma.AuthProviderUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuthProviderCreateManyInputSchema: z.ZodType<Prisma.AuthProviderCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  userId: z.number().int(),
  provider: z.string(),
  providerId: z.string(),
});

export const AuthProviderUpdateManyMutationInputSchema: z.ZodType<Prisma.AuthProviderUpdateManyMutationInput> = z.strictObject({
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuthProviderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuthProviderUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogCreateNestedManyWithoutAuthorInputSchema).optional(),
  auths: z.lazy(() => AuthProviderCreateNestedManyWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUpdateManyWithoutAuthorNestedInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUpdateManyWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BlogCreateInputSchema: z.ZodType<Prisma.BlogCreateInput> = z.strictObject({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  tags: z.union([ z.lazy(() => BlogCreatetagsInputSchema), z.string().array() ]).optional(),
  views: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutBlogsInputSchema),
});

export const BlogUncheckedCreateInputSchema: z.ZodType<Prisma.BlogUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  tags: z.union([ z.lazy(() => BlogCreatetagsInputSchema), z.string().array() ]).optional(),
  views: z.number().int().optional(),
  authorId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BlogUpdateInputSchema: z.ZodType<Prisma.BlogUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutBlogsNestedInputSchema).optional(),
});

export const BlogUncheckedUpdateInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BlogCreateManyInputSchema: z.ZodType<Prisma.BlogCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  tags: z.union([ z.lazy(() => BlogCreatetagsInputSchema), z.string().array() ]).optional(),
  views: z.number().int().optional(),
  authorId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BlogUpdateManyMutationInputSchema: z.ZodType<Prisma.BlogUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BlogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.strictObject({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional().nullable(),
  repoLink: z.string().optional().nullable(),
  liveLink: z.string().optional().nullable(),
  features: z.union([ z.lazy(() => ProjectCreatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectCreatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutProjectsInputSchema),
});

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional().nullable(),
  repoLink: z.string().optional().nullable(),
  liveLink: z.string().optional().nullable(),
  features: z.union([ z.lazy(() => ProjectCreatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectCreatetechnologiesInputSchema), z.string().array() ]).optional(),
  authorId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutProjectsNestedInputSchema).optional(),
});

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional().nullable(),
  repoLink: z.string().optional().nullable(),
  liveLink: z.string().optional().nullable(),
  features: z.union([ z.lazy(() => ProjectCreatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectCreatetechnologiesInputSchema), z.string().array() ]).optional(),
  authorId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  authorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.strictObject({
  title: z.string(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileCreateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileCreateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
});

export const ProfileUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  userId: z.number().int(),
  title: z.string(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileCreateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileCreateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileUpdateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileUpdateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
});

export const ProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileUpdateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileUpdateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  userId: z.number().int(),
  title: z.string(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileCreateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileCreateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileUpdateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileUpdateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileUpdateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileUpdateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const AuthProviderCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuthProviderCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthProviderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuthProviderAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthProviderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuthProviderMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthProviderMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuthProviderMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthProviderSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuthProviderSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const EnumUserStatusFilterSchema: z.ZodType<Prisma.EnumUserStatusFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const BlogListRelationFilterSchema: z.ZodType<Prisma.BlogListRelationFilter> = z.strictObject({
  every: z.lazy(() => BlogWhereInputSchema).optional(),
  some: z.lazy(() => BlogWhereInputSchema).optional(),
  none: z.lazy(() => BlogWhereInputSchema).optional(),
});

export const AuthProviderListRelationFilterSchema: z.ZodType<Prisma.AuthProviderListRelationFilter> = z.strictObject({
  every: z.lazy(() => AuthProviderWhereInputSchema).optional(),
  some: z.lazy(() => AuthProviderWhereInputSchema).optional(),
  none: z.lazy(() => AuthProviderWhereInputSchema).optional(),
});

export const ProjectListRelationFilterSchema: z.ZodType<Prisma.ProjectListRelationFilter> = z.strictObject({
  every: z.lazy(() => ProjectWhereInputSchema).optional(),
  some: z.lazy(() => ProjectWhereInputSchema).optional(),
  none: z.lazy(() => ProjectWhereInputSchema).optional(),
});

export const ProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.ProfileNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const BlogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BlogOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const AuthProviderOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuthProviderOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  picture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  picture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  picture: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  isVerified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const EnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.strictObject({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
});

export const BlogCountOrderByAggregateInputSchema: z.ZodType<Prisma.BlogCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  isFeatured: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BlogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BlogAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const BlogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BlogMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  isFeatured: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BlogMinOrderByAggregateInputSchema: z.ZodType<Prisma.BlogMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  isFeatured: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const BlogSumOrderByAggregateInputSchema: z.ZodType<Prisma.BlogSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  repoLink: z.lazy(() => SortOrderSchema).optional(),
  liveLink: z.lazy(() => SortOrderSchema).optional(),
  features: z.lazy(() => SortOrderSchema).optional(),
  technologies: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  repoLink: z.lazy(() => SortOrderSchema).optional(),
  liveLink: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  repoLink: z.lazy(() => SortOrderSchema).optional(),
  liveLink: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ProjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  github: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional(),
  experience: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ProfileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  github: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  github: z.lazy(() => SortOrderSchema).optional(),
  linkedin: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ProfileSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCreateNestedOneWithoutAuthsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const UserUpdateOneRequiredWithoutAuthsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuthsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuthsInputSchema), z.lazy(() => UserUpdateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuthsInputSchema) ]).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const BlogCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BlogCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => BlogCreateWithoutAuthorInputSchema), z.lazy(() => BlogCreateWithoutAuthorInputSchema).array(), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
});

export const AuthProviderCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthProviderCreateWithoutUserInputSchema), z.lazy(() => AuthProviderCreateWithoutUserInputSchema).array(), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthProviderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
});

export const ProjectCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProjectCreateWithoutAuthorInputSchema), z.lazy(() => ProjectCreateWithoutAuthorInputSchema).array(), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
});

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
});

export const BlogUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUncheckedCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => BlogCreateWithoutAuthorInputSchema), z.lazy(() => BlogCreateWithoutAuthorInputSchema).array(), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
});

export const AuthProviderUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthProviderCreateWithoutUserInputSchema), z.lazy(() => AuthProviderCreateWithoutUserInputSchema).array(), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthProviderCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
});

export const ProjectUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateNestedManyWithoutAuthorInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProjectCreateWithoutAuthorInputSchema), z.lazy(() => ProjectCreateWithoutAuthorInputSchema).array(), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
});

export const ProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const EnumUserStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => UserStatusSchema).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const BlogUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BlogUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BlogCreateWithoutAuthorInputSchema), z.lazy(() => BlogCreateWithoutAuthorInputSchema).array(), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => BlogUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => BlogUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => BlogUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema), z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
});

export const AuthProviderUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthProviderUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthProviderCreateWithoutUserInputSchema), z.lazy(() => AuthProviderCreateWithoutUserInputSchema).array(), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthProviderUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthProviderUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthProviderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthProviderUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthProviderUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthProviderUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AuthProviderUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthProviderScalarWhereInputSchema), z.lazy(() => AuthProviderScalarWhereInputSchema).array() ]).optional(),
});

export const ProjectUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProjectCreateWithoutAuthorInputSchema), z.lazy(() => ProjectCreateWithoutAuthorInputSchema).array(), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => ProjectUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => ProjectUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => ProjectUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema), z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
});

export const ProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const BlogUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => BlogCreateWithoutAuthorInputSchema), z.lazy(() => BlogCreateWithoutAuthorInputSchema).array(), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => BlogCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BlogUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => BlogUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BlogCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BlogWhereUniqueInputSchema), z.lazy(() => BlogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BlogUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => BlogUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BlogUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => BlogUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BlogScalarWhereInputSchema), z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
});

export const AuthProviderUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuthProviderUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuthProviderCreateWithoutUserInputSchema), z.lazy(() => AuthProviderCreateWithoutUserInputSchema).array(), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema), z.lazy(() => AuthProviderCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuthProviderUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthProviderUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuthProviderCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuthProviderWhereUniqueInputSchema), z.lazy(() => AuthProviderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuthProviderUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AuthProviderUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuthProviderUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AuthProviderUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuthProviderScalarWhereInputSchema), z.lazy(() => AuthProviderScalarWhereInputSchema).array() ]).optional(),
});

export const ProjectUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutAuthorNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProjectCreateWithoutAuthorInputSchema), z.lazy(() => ProjectCreateWithoutAuthorInputSchema).array(), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => ProjectCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => ProjectUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema), z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => ProjectUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => ProjectUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema), z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
});

export const ProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const BlogCreatetagsInputSchema: z.ZodType<Prisma.BlogCreatetagsInput> = z.strictObject({
  set: z.string().array(),
});

export const UserCreateNestedOneWithoutBlogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBlogsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBlogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const BlogUpdatetagsInputSchema: z.ZodType<Prisma.BlogUpdatetagsInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutBlogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBlogsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBlogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBlogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBlogsInputSchema), z.lazy(() => UserUpdateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBlogsInputSchema) ]).optional(),
});

export const ProjectCreatefeaturesInputSchema: z.ZodType<Prisma.ProjectCreatefeaturesInput> = z.strictObject({
  set: z.string().array(),
});

export const ProjectCreatetechnologiesInputSchema: z.ZodType<Prisma.ProjectCreatetechnologiesInput> = z.strictObject({
  set: z.string().array(),
});

export const UserCreateNestedOneWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProjectsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const ProjectUpdatefeaturesInputSchema: z.ZodType<Prisma.ProjectUpdatefeaturesInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const ProjectUpdatetechnologiesInputSchema: z.ZodType<Prisma.ProjectUpdatetechnologiesInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutProjectsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProjectsInputSchema), z.lazy(() => UserUpdateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]).optional(),
});

export const ProfileCreateskillsInputSchema: z.ZodType<Prisma.ProfileCreateskillsInput> = z.strictObject({
  set: z.string().array(),
});

export const ProfileCreateexperienceInputSchema: z.ZodType<Prisma.ProfileCreateexperienceInput> = z.strictObject({
  set: z.string().array(),
});

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const ProfileUpdateskillsInputSchema: z.ZodType<Prisma.ProfileUpdateskillsInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const ProfileUpdateexperienceInputSchema: z.ZodType<Prisma.ProfileUpdateexperienceInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema), z.lazy(() => UserUpdateWithoutProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const NestedEnumUserStatusFilterSchema: z.ZodType<Prisma.NestedEnumUserStatusFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const NestedEnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const UserCreateWithoutAuthsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuthsInput> = z.strictObject({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogCreateNestedManyWithoutAuthorInputSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAuthsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthsInput> = z.strictObject({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAuthsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthsInputSchema) ]),
});

export const UserUpsertWithoutAuthsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuthsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuthsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuthsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAuthsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuthsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuthsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuthsInputSchema) ]),
});

export const UserUpdateWithoutAuthsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuthsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUpdateManyWithoutAuthorNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAuthsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthsInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const BlogCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogCreateWithoutAuthorInput> = z.strictObject({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  tags: z.union([ z.lazy(() => BlogCreatetagsInputSchema), z.string().array() ]).optional(),
  views: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BlogUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUncheckedCreateWithoutAuthorInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  tags: z.union([ z.lazy(() => BlogCreatetagsInputSchema), z.string().array() ]).optional(),
  views: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BlogCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.BlogCreateOrConnectWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BlogCreateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const BlogCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.BlogCreateManyAuthorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => BlogCreateManyAuthorInputSchema), z.lazy(() => BlogCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AuthProviderCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderCreateWithoutUserInput> = z.strictObject({
  provider: z.string(),
  providerId: z.string(),
});

export const AuthProviderUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.number().int().optional(),
  provider: z.string(),
  providerId: z.string(),
});

export const AuthProviderCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthProviderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuthProviderCreateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema) ]),
});

export const AuthProviderCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AuthProviderCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AuthProviderCreateManyUserInputSchema), z.lazy(() => AuthProviderCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProjectCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectCreateWithoutAuthorInput> = z.strictObject({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional().nullable(),
  repoLink: z.string().optional().nullable(),
  liveLink: z.string().optional().nullable(),
  features: z.union([ z.lazy(() => ProjectCreatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectCreatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProjectUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutAuthorInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional().nullable(),
  repoLink: z.string().optional().nullable(),
  liveLink: z.string().optional().nullable(),
  features: z.union([ z.lazy(() => ProjectCreatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectCreatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProjectCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const ProjectCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.ProjectCreateManyAuthorInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ProjectCreateManyAuthorInputSchema), z.lazy(() => ProjectCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateWithoutUserInput> = z.strictObject({
  title: z.string(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileCreateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileCreateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileCreateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileCreateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
});

export const BlogUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUpsertWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BlogUpdateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => BlogCreateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const BlogUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUpdateWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => BlogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateWithoutAuthorInputSchema), z.lazy(() => BlogUncheckedUpdateWithoutAuthorInputSchema) ]),
});

export const BlogUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUpdateManyWithWhereWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => BlogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BlogUpdateManyMutationInputSchema), z.lazy(() => BlogUncheckedUpdateManyWithoutAuthorInputSchema) ]),
});

export const BlogScalarWhereInputSchema: z.ZodType<Prisma.BlogScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => BlogScalarWhereInputSchema), z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BlogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BlogScalarWhereInputSchema), z.lazy(() => BlogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  isFeatured: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const AuthProviderUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthProviderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuthProviderUpdateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AuthProviderCreateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedCreateWithoutUserInputSchema) ]),
});

export const AuthProviderUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthProviderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuthProviderUpdateWithoutUserInputSchema), z.lazy(() => AuthProviderUncheckedUpdateWithoutUserInputSchema) ]),
});

export const AuthProviderUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AuthProviderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuthProviderUpdateManyMutationInputSchema), z.lazy(() => AuthProviderUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const AuthProviderScalarWhereInputSchema: z.ZodType<Prisma.AuthProviderScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuthProviderScalarWhereInputSchema), z.lazy(() => AuthProviderScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuthProviderScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuthProviderScalarWhereInputSchema), z.lazy(() => AuthProviderScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const ProjectUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUpsertWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedCreateWithoutAuthorInputSchema) ]),
});

export const ProjectUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUpdateWithWhereUniqueWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutAuthorInputSchema), z.lazy(() => ProjectUncheckedUpdateWithoutAuthorInputSchema) ]),
});

export const ProjectUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithWhereWithoutAuthorInput> = z.strictObject({
  where: z.lazy(() => ProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateManyMutationInputSchema), z.lazy(() => ProjectUncheckedUpdateManyWithoutAuthorInputSchema) ]),
});

export const ProjectScalarWhereInputSchema: z.ZodType<Prisma.ProjectScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ProjectScalarWhereInputSchema), z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereInputSchema), z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  repoLink: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  liveLink: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  features: z.lazy(() => StringNullableListFilterSchema).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  authorId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const ProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutUserInput> = z.strictObject({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
});

export const ProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema), z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
});

export const ProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutUserInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileUpdateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileUpdateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.lazy(() => ProfileUpdateskillsInputSchema), z.string().array() ]).optional(),
  experience: z.union([ z.lazy(() => ProfileUpdateexperienceInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateWithoutBlogsInputSchema: z.ZodType<Prisma.UserCreateWithoutBlogsInput> = z.strictObject({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auths: z.lazy(() => AuthProviderCreateNestedManyWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutBlogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBlogsInput> = z.strictObject({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auths: z.lazy(() => AuthProviderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutBlogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBlogsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]),
});

export const UserUpsertWithoutBlogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBlogsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBlogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutBlogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutBlogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBlogsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBlogsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutBlogsInputSchema) ]),
});

export const UserUpdateWithoutBlogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBlogsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auths: z.lazy(() => AuthProviderUpdateManyWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutBlogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBlogsInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auths: z.lazy(() => AuthProviderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateWithoutProjectsInput> = z.strictObject({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogCreateNestedManyWithoutAuthorInputSchema).optional(),
  auths: z.lazy(() => AuthProviderCreateNestedManyWithoutUserInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutProjectsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProjectsInput> = z.strictObject({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProjectsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]),
});

export const UserUpsertWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpsertWithoutProjectsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProjectsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProjectsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]),
});

export const UserUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpdateWithoutProjectsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUpdateManyWithoutAuthorNestedInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUpdateManyWithoutUserNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProjectsInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.strictObject({
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogCreateNestedManyWithoutAuthorInputSchema).optional(),
  auths: z.lazy(() => AuthProviderCreateNestedManyWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.strictObject({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string(),
  picture: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  isVerified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  blogs: z.lazy(() => BlogUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
});

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
});

export const UserUpsertWithoutProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
});

export const UserUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUpdateManyWithoutAuthorNestedInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUpdateManyWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  picture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema), z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  isVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  blogs: z.lazy(() => BlogUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  auths: z.lazy(() => AuthProviderUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  projects: z.lazy(() => ProjectUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
});

export const BlogCreateManyAuthorInputSchema: z.ZodType<Prisma.BlogCreateManyAuthorInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
  tags: z.union([ z.lazy(() => BlogCreatetagsInputSchema), z.string().array() ]).optional(),
  views: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const AuthProviderCreateManyUserInputSchema: z.ZodType<Prisma.AuthProviderCreateManyUserInput> = z.strictObject({
  id: z.number().int().optional(),
  provider: z.string(),
  providerId: z.string(),
});

export const ProjectCreateManyAuthorInputSchema: z.ZodType<Prisma.ProjectCreateManyAuthorInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional().nullable(),
  repoLink: z.string().optional().nullable(),
  liveLink: z.string().optional().nullable(),
  features: z.union([ z.lazy(() => ProjectCreatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectCreatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const BlogUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUpdateWithoutAuthorInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BlogUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const BlogUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.BlogUncheckedUpdateManyWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFeatured: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => BlogUpdatetagsInputSchema), z.string().array() ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuthProviderUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUpdateWithoutUserInput> = z.strictObject({
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuthProviderUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuthProviderUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AuthProviderUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutAuthorInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ProjectUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutAuthorInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repoLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  liveLink: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  features: z.union([ z.lazy(() => ProjectUpdatefeaturesInputSchema), z.string().array() ]).optional(),
  technologies: z.union([ z.lazy(() => ProjectUpdatetechnologiesInputSchema), z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AuthProviderFindFirstArgsSchema: z.ZodType<Prisma.AuthProviderFindFirstArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereInputSchema.optional(), 
  orderBy: z.union([ AuthProviderOrderByWithRelationInputSchema.array(), AuthProviderOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthProviderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthProviderScalarFieldEnumSchema, AuthProviderScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuthProviderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuthProviderFindFirstOrThrowArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereInputSchema.optional(), 
  orderBy: z.union([ AuthProviderOrderByWithRelationInputSchema.array(), AuthProviderOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthProviderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthProviderScalarFieldEnumSchema, AuthProviderScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuthProviderFindManyArgsSchema: z.ZodType<Prisma.AuthProviderFindManyArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereInputSchema.optional(), 
  orderBy: z.union([ AuthProviderOrderByWithRelationInputSchema.array(), AuthProviderOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthProviderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuthProviderScalarFieldEnumSchema, AuthProviderScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuthProviderAggregateArgsSchema: z.ZodType<Prisma.AuthProviderAggregateArgs> = z.object({
  where: AuthProviderWhereInputSchema.optional(), 
  orderBy: z.union([ AuthProviderOrderByWithRelationInputSchema.array(), AuthProviderOrderByWithRelationInputSchema ]).optional(),
  cursor: AuthProviderWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuthProviderGroupByArgsSchema: z.ZodType<Prisma.AuthProviderGroupByArgs> = z.object({
  where: AuthProviderWhereInputSchema.optional(), 
  orderBy: z.union([ AuthProviderOrderByWithAggregationInputSchema.array(), AuthProviderOrderByWithAggregationInputSchema ]).optional(),
  by: AuthProviderScalarFieldEnumSchema.array(), 
  having: AuthProviderScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuthProviderFindUniqueArgsSchema: z.ZodType<Prisma.AuthProviderFindUniqueArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereUniqueInputSchema, 
}).strict();

export const AuthProviderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuthProviderFindUniqueOrThrowArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereUniqueInputSchema, 
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const BlogFindFirstArgsSchema: z.ZodType<Prisma.BlogFindFirstArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(), 
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(), BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema, BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BlogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BlogFindFirstOrThrowArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(), 
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(), BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema, BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BlogFindManyArgsSchema: z.ZodType<Prisma.BlogFindManyArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereInputSchema.optional(), 
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(), BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BlogScalarFieldEnumSchema, BlogScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const BlogAggregateArgsSchema: z.ZodType<Prisma.BlogAggregateArgs> = z.object({
  where: BlogWhereInputSchema.optional(), 
  orderBy: z.union([ BlogOrderByWithRelationInputSchema.array(), BlogOrderByWithRelationInputSchema ]).optional(),
  cursor: BlogWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BlogGroupByArgsSchema: z.ZodType<Prisma.BlogGroupByArgs> = z.object({
  where: BlogWhereInputSchema.optional(), 
  orderBy: z.union([ BlogOrderByWithAggregationInputSchema.array(), BlogOrderByWithAggregationInputSchema ]).optional(),
  by: BlogScalarFieldEnumSchema.array(), 
  having: BlogScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const BlogFindUniqueArgsSchema: z.ZodType<Prisma.BlogFindUniqueArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema, 
}).strict();

export const BlogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlogFindUniqueOrThrowArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema, 
}).strict();

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(), 
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(), ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema, ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(), 
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(), ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema, ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(), 
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(), ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema, ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(), 
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(), ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(), 
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(), ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(), 
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema, 
}).strict();

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema, 
}).strict();

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(), 
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema, ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindFirstOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(), 
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema, ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProfileFindManyArgsSchema: z.ZodType<Prisma.ProfileFindManyArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(), 
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema, ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ProfileAggregateArgsSchema: z.ZodType<Prisma.ProfileAggregateArgs> = z.object({
  where: ProfileWhereInputSchema.optional(), 
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(), ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileGroupByArgsSchema: z.ZodType<Prisma.ProfileGroupByArgs> = z.object({
  where: ProfileWhereInputSchema.optional(), 
  orderBy: z.union([ ProfileOrderByWithAggregationInputSchema.array(), ProfileOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileScalarFieldEnumSchema.array(), 
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ProfileFindUniqueArgsSchema: z.ZodType<Prisma.ProfileFindUniqueArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema, 
}).strict();

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema, 
}).strict();

export const AuthProviderCreateArgsSchema: z.ZodType<Prisma.AuthProviderCreateArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  data: z.union([ AuthProviderCreateInputSchema, AuthProviderUncheckedCreateInputSchema ]),
}).strict();

export const AuthProviderUpsertArgsSchema: z.ZodType<Prisma.AuthProviderUpsertArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereUniqueInputSchema, 
  create: z.union([ AuthProviderCreateInputSchema, AuthProviderUncheckedCreateInputSchema ]),
  update: z.union([ AuthProviderUpdateInputSchema, AuthProviderUncheckedUpdateInputSchema ]),
}).strict();

export const AuthProviderCreateManyArgsSchema: z.ZodType<Prisma.AuthProviderCreateManyArgs> = z.object({
  data: z.union([ AuthProviderCreateManyInputSchema, AuthProviderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuthProviderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthProviderCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuthProviderCreateManyInputSchema, AuthProviderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuthProviderDeleteArgsSchema: z.ZodType<Prisma.AuthProviderDeleteArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  where: AuthProviderWhereUniqueInputSchema, 
}).strict();

export const AuthProviderUpdateArgsSchema: z.ZodType<Prisma.AuthProviderUpdateArgs> = z.object({
  select: AuthProviderSelectSchema.optional(),
  include: AuthProviderIncludeSchema.optional(),
  data: z.union([ AuthProviderUpdateInputSchema, AuthProviderUncheckedUpdateInputSchema ]),
  where: AuthProviderWhereUniqueInputSchema, 
}).strict();

export const AuthProviderUpdateManyArgsSchema: z.ZodType<Prisma.AuthProviderUpdateManyArgs> = z.object({
  data: z.union([ AuthProviderUpdateManyMutationInputSchema, AuthProviderUncheckedUpdateManyInputSchema ]),
  where: AuthProviderWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuthProviderUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuthProviderUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AuthProviderUpdateManyMutationInputSchema, AuthProviderUncheckedUpdateManyInputSchema ]),
  where: AuthProviderWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuthProviderDeleteManyArgsSchema: z.ZodType<Prisma.AuthProviderDeleteManyArgs> = z.object({
  where: AuthProviderWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BlogCreateArgsSchema: z.ZodType<Prisma.BlogCreateArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  data: z.union([ BlogCreateInputSchema, BlogUncheckedCreateInputSchema ]),
}).strict();

export const BlogUpsertArgsSchema: z.ZodType<Prisma.BlogUpsertArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema, 
  create: z.union([ BlogCreateInputSchema, BlogUncheckedCreateInputSchema ]),
  update: z.union([ BlogUpdateInputSchema, BlogUncheckedUpdateInputSchema ]),
}).strict();

export const BlogCreateManyArgsSchema: z.ZodType<Prisma.BlogCreateManyArgs> = z.object({
  data: z.union([ BlogCreateManyInputSchema, BlogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BlogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogCreateManyAndReturnArgs> = z.object({
  data: z.union([ BlogCreateManyInputSchema, BlogCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const BlogDeleteArgsSchema: z.ZodType<Prisma.BlogDeleteArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  where: BlogWhereUniqueInputSchema, 
}).strict();

export const BlogUpdateArgsSchema: z.ZodType<Prisma.BlogUpdateArgs> = z.object({
  select: BlogSelectSchema.optional(),
  include: BlogIncludeSchema.optional(),
  data: z.union([ BlogUpdateInputSchema, BlogUncheckedUpdateInputSchema ]),
  where: BlogWhereUniqueInputSchema, 
}).strict();

export const BlogUpdateManyArgsSchema: z.ZodType<Prisma.BlogUpdateManyArgs> = z.object({
  data: z.union([ BlogUpdateManyMutationInputSchema, BlogUncheckedUpdateManyInputSchema ]),
  where: BlogWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BlogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BlogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BlogUpdateManyMutationInputSchema, BlogUncheckedUpdateManyInputSchema ]),
  where: BlogWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const BlogDeleteManyArgsSchema: z.ZodType<Prisma.BlogDeleteManyArgs> = z.object({
  where: BlogWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema, ProjectUncheckedCreateInputSchema ]),
}).strict();

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema, 
  create: z.union([ ProjectCreateInputSchema, ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema, ProjectUncheckedUpdateInputSchema ]),
}).strict();

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema, ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProjectCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema, ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema, 
}).strict();

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema, ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema, 
}).strict();

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema, ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProjectUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema, ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProfileCreateArgsSchema: z.ZodType<Prisma.ProfileCreateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileCreateInputSchema, ProfileUncheckedCreateInputSchema ]),
}).strict();

export const ProfileUpsertArgsSchema: z.ZodType<Prisma.ProfileUpsertArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema, 
  create: z.union([ ProfileCreateInputSchema, ProfileUncheckedCreateInputSchema ]),
  update: z.union([ ProfileUpdateInputSchema, ProfileUncheckedUpdateInputSchema ]),
}).strict();

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema, ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema, ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ProfileDeleteArgsSchema: z.ZodType<Prisma.ProfileDeleteArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema, 
}).strict();

export const ProfileUpdateArgsSchema: z.ZodType<Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileUpdateInputSchema, ProfileUncheckedUpdateInputSchema ]),
  where: ProfileWhereUniqueInputSchema, 
}).strict();

export const ProfileUpdateManyArgsSchema: z.ZodType<Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema, ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema, ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ProfileDeleteManyArgsSchema: z.ZodType<Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();