Rails.application.routes.draw do
  get 'stops/index'

  get 'legs/index'

  namespace :api do
    namespace :v1 do
      resources :drivers, only: [:index, :show, :update]
      resources :legs, only: [:index]
      resources :stops, only: [:index]
      get '/driver', to: 'stops#driver'
      put '/driver', to: 'stops#update_driver'
      get '/bonusdriver', to: 'stops#bonus_driver'
      put '/bonusdriver', to: 'stops#update_bonus_driver'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
