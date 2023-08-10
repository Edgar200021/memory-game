export enum FilterNames {
  DESCRIPTION = 'description',
  TEXT = 'text',
  HISTORY = 'history',
}

export type FilterTuple = [
  FilterNames.DESCRIPTION,
  FilterNames.TEXT,
  FilterNames.HISTORY
]

export interface BoardFields {
  image: string
  id: number
  fieldsForFilter?: Record<FilterNames, string>
}
