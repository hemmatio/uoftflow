Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do # /api/v1/ prefix

      # Authentication routes
      post "/signup", to: "users#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/me", to: "sessions#show"

      # Search route
      get "/search", to: "search#index"

      # Department routes
      # For browsing courses by department
      resources :departments, only: [:index, :show, :create] do
        resources :courses, only: [:index], controller: "departments/courses"
      end

      # Course routes
      # For browsing individual courses
      resources :courses, only: [:index, :show, :create] do
        resources :reviews, only: [:index]
        resources :course_offerings, only: [:index]
      end

      # Professor routes
      # For browsing individual professors
      resources :professors, only: [:index, :show, :create] do
        resources :reviews, only: [:index]
        resources :course_offerings, only: [:index]
      end

      # Course offering routes
      # For browsing individual course offerings
      resources :course_offerings, only: [:index, :show, :create] do
        resources :reviews, only: [:index]
      end

      # Review routes
      # For creating / deleting reviews
      resources :reviews, only: [:create, :destroy]
    end
  end
end
