module Api
  module V1
    class DepartmentsController < ApplicationController
      def index
        departments = Department.all
        render json: departments
      end

      def show
        department = Department.find(params[:id])
        render json: department
      end

      def create
        department = Department.new(department_params)
        if department.save
          render json: department, status: :created
        else
          render json: { errors: department.errors }, status: :unprocessable_entity
        end
      end

      private

      def department_params
        params.require(:department).permit(:name)
      end
    end
  end
end

