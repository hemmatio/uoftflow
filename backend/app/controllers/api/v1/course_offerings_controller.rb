module Api
  module V1
    class CourseOfferingsController < ApplicationController
      def index
        if params[:course_id]
          course_offerings = CourseOffering.where(course_id: params[:course_id])
        elsif params[:professor_id]
          course_offerings = CourseOffering.where(professor_id: params[:professor_id])
        else
          course_offerings = CourseOffering.all
        end
        render json: course_offerings
      end

      def show
        course_offering = CourseOffering.find(params[:id])
        render json: course_offering
      end

      def create
        course_offering = CourseOffering.new(course_offering_params)
        if course_offering.save
          render json: course_offering, status: :created
        else
          render json: { errors: course_offering.errors }, status: :unprocessable_entity
        end
      end

      private

      def course_offering_params
        params.require(:course_offering).permit(:term, :course_id, :professor_id)
      end
    end
  end
end

