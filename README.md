# GraphQL URL Decoder

## Installation

```bash
npm i graphql-decoder
```

## Usage

This project is used for extracting and formatting a GraphQL query from a full request URL.

For example:

Input:
```bash
npx graphql-decoder https://example.com/%7B%20test%20%7B%20example%20%7D%20%7D/more-stuff
```

Output:
```gql
{
  test {
    example
  }
}
```

# Command line arguments

By specifying a relative file path with the `--outputFile` named argument, the formatted GraphQL query can be saved to a file, e.g.

```bash
npx graphql-decoder https://example.com/%7B%20test%20%7B%20example%20%7D%20%7D/more-stuff --outputFile query.graphql
```
