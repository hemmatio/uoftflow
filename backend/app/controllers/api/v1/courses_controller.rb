module Api
  module V1
    class CoursesController < ApplicationController
      def index
        courses = Course.all
        render json: courses
      end

      def show
        course = Course.find(params[:id])
        render json: course
      end

      def create
        course = Course.new(course_params)
        if course.save
          render json: course, status: :created
        else
          render json: { errors: course.errors }, status: :unprocessable_entity
        end
      end

      private

      def course_params
        params.require(:course).permit(:code, :title, :description, :department_id)
      end
    end
  end
end

