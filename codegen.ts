import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://countries.nausicaa.wilders.dev/',
	documents: 'src/components/*.tsx',
	generates: {
		'src/gql/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
	},
	ignoreNoDocuments: true,
}

export default config
