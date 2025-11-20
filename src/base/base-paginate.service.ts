export class BasePaginateService<
  TModel,
  TWhere = any,
  TOrderBy = any,
  TInclude = any,
  TSelect = any,
> {
  protected model: any; // must be assigned in child services

  async paginate(params: {
    page?: number;
    limit?: number;
    where?: TWhere;
    orderBy?: TOrderBy;
    include?: TInclude;
    select?: TSelect;
  }) {
    const { page = 1, limit = 10, where, orderBy, include, select } = params;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.findMany({
        skip,
        take: limit,
        where,
        orderBy,
        include,
        select,
      }),
      this.model.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}
