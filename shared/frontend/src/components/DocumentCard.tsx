import React from 'react';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiBadge } from '@elastic/eui';
import type { Document, Product, Review, User } from '../types';

// Simple star rating display
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <span style={{ color: '#FEC514', fontSize: '14px' }}>
      {'★'.repeat(fullStars)}
      {hasHalfStar && '½'}
      {'☆'.repeat(emptyStars)}
    </span>
  );
}

interface DocumentCardProps {
  document: Document;
  score?: number;
  displayFields?: string[];
  onClick?: () => void;
}

// Type guards - use unique fields to identify document types
// Note: product_reviews has product_id as a foreign key, so we need more specific checks
function isProduct(doc: Document): doc is Product {
  return 'product_id' in doc && 'product_name' in doc && !('review_id' in doc);
}

function isReview(doc: Document): doc is Review {
  return 'review_id' in doc;
}

function isUser(doc: Document): doc is User {
  return 'user_id' in doc && 'username' in doc && !('review_id' in doc);
}

// Helper to safely truncate text
function truncateText(text: string | undefined | null, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, score, onClick }) => {
  if (isProduct(document)) {
    const description = truncateText(document.product_description, 150);
    const price = typeof document.product_price === 'number' ? document.product_price.toFixed(2) : '0.00';
    
    return (
      <EuiCard
        title={document.product_name || 'Untitled Product'}
        onClick={onClick}
        style={{ background: 'rgba(26, 35, 50, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
        description={
          <>
            <span style={{ color: '#98A2B3', fontSize: '14px', display: 'block' }}>
              {document.product_brand || 'Unknown Brand'} • {document.product_category || 'Uncategorized'}
            </span>
            {description && (
              <span style={{ marginTop: '8px', fontSize: '14px', display: 'block' }}>
                {description}
              </span>
            )}
            {score !== undefined && (
              <span style={{ marginTop: '8px', fontSize: '12px', color: '#98A2B3', display: 'block' }}>
                Score: {score.toFixed(2)}
              </span>
            )}
          </>
        }
        footer={
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <strong>${price}</strong>
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    );
  }

  if (isReview(document)) {
    const reviewText = truncateText(document.review_text, 200);
    const rating = typeof document.review_rating === 'number' ? document.review_rating : 0;
    
    return (
      <EuiCard
        title={document.review_title || 'Untitled Review'}
        onClick={onClick}
        style={{ background: 'rgba(26, 35, 50, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
        description={
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <StarRating rating={rating} />
              <span style={{ color: '#98A2B3', fontSize: '14px' }}>{rating}/5</span>
            </span>
            {reviewText && (
              <span style={{ marginTop: '8px', fontSize: '14px', display: 'block' }}>
                {reviewText}
              </span>
            )}
            {score !== undefined && (
              <span style={{ marginTop: '8px', fontSize: '12px', color: '#98A2B3', display: 'block' }}>
                Score: {score.toFixed(2)}
              </span>
            )}
          </>
        }
        footer={
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <span style={{ fontSize: '14px', color: '#98A2B3' }}>
                by {document.reviewer_name || 'Anonymous'}
              </span>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              {document.verified_purchase === 'true' && (
                <EuiBadge color="success">Verified Purchase</EuiBadge>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    );
  }

  if (isUser(document)) {
    const trustScore = typeof document.trust_score === 'number' ? document.trust_score.toFixed(1) : '0.0';
    const reviewCount = typeof document.total_reviews_count === 'number' ? document.total_reviews_count : 0;
    
    return (
      <EuiCard
        title={document.username || 'Unknown User'}
        onClick={onClick}
        style={{ background: 'rgba(26, 35, 50, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
        description={
          <>
            <span style={{ color: '#98A2B3', fontSize: '14px', display: 'block' }}>
              {document.location_city || 'Unknown'}, {document.location_state || ''} • {document.account_type || 'Standard'}
            </span>
            <span style={{ marginTop: '8px', fontSize: '14px', display: 'block' }}>
              {document.occupation || 'Not specified'} • {document.age_group || 'Unknown'}
            </span>
            {document.interests && (
              <span style={{ marginTop: '8px', fontSize: '14px', display: 'block' }}>
                Interests: {document.interests}
              </span>
            )}
            {score !== undefined && (
              <span style={{ marginTop: '8px', fontSize: '12px', color: '#98A2B3', display: 'block' }}>
                Score: {score.toFixed(2)}
              </span>
            )}
          </>
        }
        footer={
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <span style={{ fontSize: '14px' }}>{reviewCount} reviews</span>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <span style={{ fontSize: '14px', color: '#98A2B3' }}>Trust: {trustScore}</span>
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    );
  }

  // Fallback for unknown document types
  return (
    <EuiCard
      title="Unknown Document Type"
      description="Unable to display this document"
      onClick={onClick}
      style={{ background: 'rgba(26, 35, 50, 0.4)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
    />
  );
};
