require 'test_helper'

class LegsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get legs_index_url
    assert_response :success
  end

end
