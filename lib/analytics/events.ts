// Analytics event type definitions and helpers
// Golden events for ILH site

export type ContentType = "article" | "remedy" | "bach" | "condition" | "doctors" | "research";

export type TopicGroup = 
  | "musculoskeletal" 
  | "respiratory" 
  | "digestive" 
  | "neuro" 
  | "women" 
  | "skin";

export type Author = "ILH Editorial" | "Guest";

export interface ContentTaxonomy {
  content_type: ContentType;
  content_slug?: string;
  topic_group?: TopicGroup;
  author?: Author;
}

export interface BaseEvent {
  event_name: string;
  timestamp?: string;
}

// Golden Events

export interface ViewContentEvent extends BaseEvent {
  event_name: "view_content";
  content_type: ContentType;
  content_slug?: string;
  topic_group?: TopicGroup;
  author?: Author;
  page_path: string;
  page_title?: string;
}

export interface SearchSiteEvent extends BaseEvent {
  event_name: "search_site";
  query: string;
  results_count: number;
}

export interface ClickInternalNavEvent extends BaseEvent {
  event_name: "click_internal_nav";
  from: string;
  to: string;
  link_text?: string;
}

export interface ClickCTAEvent extends BaseEvent {
  event_name: "click_cta";
  cta_label: string;
  destination: string;
  page_path: string;
}

export interface ClickOutboundEvent extends BaseEvent {
  event_name: "click_outbound";
  domain: string;
  path?: string;
  page_path: string;
}

export interface ReadDepthEvent extends BaseEvent {
  event_name: "read_depth";
  depth_percentage: 25 | 50 | 75 | 100;
  content_type: ContentType;
  content_slug?: string;
  page_path: string;
}

export interface TimeOnPageBucketEvent extends BaseEvent {
  event_name: "time_on_page_bucket";
  time_bucket: "0-10s" | "10-30s" | "30-90s" | "90s+";
  content_type: ContentType;
  content_slug?: string;
  page_path: string;
}

export interface ConditionToRemedyEvent extends BaseEvent {
  event_name: "condition_to_remedy";
  condition: string;
  remedy: string;
  page_path: string;
}

export interface RemedyToConditionEvent extends BaseEvent {
  event_name: "remedy_to_condition";
  remedy: string;
  condition: string;
  page_path: string;
}

export interface ShareArticleEvent extends BaseEvent {
  event_name: "share_article";
  channel: string;
  content_type: ContentType;
  content_slug?: string;
  page_path: string;
}

export interface SubmitStoryEvent extends BaseEvent {
  event_name: "submit_story";
  story_type?: string;
  page_path: string;
}

export type AnalyticsEvent =
  | ViewContentEvent
  | SearchSiteEvent
  | ClickInternalNavEvent
  | ClickCTAEvent
  | ClickOutboundEvent
  | ReadDepthEvent
  | TimeOnPageBucketEvent
  | ConditionToRemedyEvent
  | RemedyToConditionEvent
  | ShareArticleEvent
  | SubmitStoryEvent;

// Helper functions

export function createViewContentEvent(
  taxonomy: ContentTaxonomy,
  pagePath: string,
  pageTitle?: string
): ViewContentEvent {
  return {
    event_name: "view_content",
    content_type: taxonomy.content_type,
    content_slug: taxonomy.content_slug,
    topic_group: taxonomy.topic_group,
    author: taxonomy.author,
    page_path: pagePath,
    page_title: pageTitle,
  };
}

export function createClickInternalNavEvent(
  from: string,
  to: string,
  linkText?: string
): ClickInternalNavEvent {
  return {
    event_name: "click_internal_nav",
    from,
    to,
    link_text: linkText,
  };
}

export function createClickCTAEvent(
  ctaLabel: string,
  destination: string,
  pagePath: string
): ClickCTAEvent {
  return {
    event_name: "click_cta",
    cta_label: ctaLabel,
    destination,
    page_path: pagePath,
  };
}

export function createClickOutboundEvent(
  domain: string,
  pagePath: string,
  path?: string
): ClickOutboundEvent {
  return {
    event_name: "click_outbound",
    domain,
    path,
    page_path: pagePath,
  };
}

export function createConditionToRemedyEvent(
  condition: string,
  remedy: string,
  pagePath: string
): ConditionToRemedyEvent {
  return {
    event_name: "condition_to_remedy",
    condition,
    remedy,
    page_path: pagePath,
  };
}

export function createRemedyToConditionEvent(
  remedy: string,
  condition: string,
  pagePath: string
): RemedyToConditionEvent {
  return {
    event_name: "remedy_to_condition",
    remedy,
    condition,
    page_path: pagePath,
  };
}

