import { ComponentStory, ComponentMeta } from "@storybook/react";
import NormalTab from "components/molecules/tab/NormalTab/NormalTab";
import Component from "./MyPage.template";

export default {
  title: "Components/Templates/MyPage",
  component: Component,
  args: {
    myPageTab: (
      <NormalTab
        active={0}
        switchTab={(e) => {}}
        tabs={[
          { tabName: "Sample", content: <div className="h-96 bg-white"></div> },
          { tabName: "Sample2", content: <div className="h-96 bg-white"></div> },
        ]}
      />
    ),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
