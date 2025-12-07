module Api
  module V1
    module Departments
      class CoursesController < ApplicationController
        def index
          department = Department.find(params[:department_id])
          courses = department.courses
          render json: courses
        end
      end
    end
  end
end

