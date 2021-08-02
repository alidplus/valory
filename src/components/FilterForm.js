import React, { useEffect } from "react";
import {useForm} from "react-hook-form";

const FilterForm = function FilterForm({ defaultValues, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    // getValues,
    watch,
    // control,
    reset,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const dateTo = watch('dateTo')
  const dateFrom = watch('dateFrom')

  return (
    <form id="filter-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label className="form-label" htmlFor="dateFrom">from</label>
        <input type="date" className="form-control" name="dateFrom" id="dateFrom" max={dateTo} disabled={isLoading} {...register("dateFrom")}/>
        <label className="form-label" htmlFor="dateTo">to</label>
        <input type="date" className="form-control" name="dateTo" id="dateTo" min={dateFrom} disabled={isLoading} {...register("dateTo")}/>
      </div>
      <button className="btn" disabled={isLoading || !dateTo || !dateFrom}>
        {isLoading ? 'Loading...' : 'Update'}
      </button>
    </form>
  );
}

export default FilterForm;
